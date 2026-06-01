import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { useAuthStore } from "@/store/auth/auth";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "./mutations/Auth";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let isRefreshing = false;
let pendingRequests: Array<(value?: unknown) => void> = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  const authError = error.message === "Not authenticated";

  if (authError) {
    const { refreshToken, logout, setRefreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      logout();
      return;
    }

    if (!isRefreshing) {
      isRefreshing = true;

      return new Observable((observer) => {
        apolloClient
          .mutate({
            mutation: REFRESH_TOKEN,
            variables: { token: refreshToken },
          })
          .then(({ data }: any) => {
            if (data?.refreshToken) {
              const { token, refreshToken: newRefreshToken } =
                data.refreshToken;
              setRefreshToken(token, newRefreshToken);
              resolvePendingRequests();
              forward(operation).subscribe(observer);
              return;
            }
            logout();
            observer.error(authError);
          })
          .catch(() => {
            pendingRequests = [];
            logout();
            observer.error(authError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return new Observable((observer) => {
      pendingRequests.push(() => {
        forward(operation).subscribe(observer);
      });
    });
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
