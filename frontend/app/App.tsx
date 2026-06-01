import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "./components/error-boundary";

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
