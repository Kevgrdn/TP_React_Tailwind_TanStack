import "./App.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {CountriesProvider} from "./context/Context";
import {RouterProvider} from "react-router-dom";
import router from "./router/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CountriesProvider>
        <RouterProvider router={router} />
      </CountriesProvider>
    </QueryClientProvider>
  );
}

export default App;
