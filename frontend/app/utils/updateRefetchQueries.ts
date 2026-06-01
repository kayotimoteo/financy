import type { ApolloCache } from "@apollo/client";

export const updateQueries = (cache: ApolloCache) => {
  cache.evict({ fieldName: "summaryTransaction" });
  cache.evict({ fieldName: "listTransactions" });
  cache.evict({ fieldName: "listAllCategories" });
  cache.evict({ fieldName: "summaryCategory" });
  cache.gc();
};

export const refetchQueries = () => {
  return [
    "ListTransactions",
    "SummaryTransaction",
    "ListCategories",
    "SummaryCategory",
  ];
};
