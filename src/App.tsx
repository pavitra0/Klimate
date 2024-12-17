import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/theme-provider";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import WeatherDashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city-page";
import ErrorBoundary from "./components/error-boundary";
import {Toaster} from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark">
            <Toaster 
        position="bottom-left"
         richColors/>
            <Layout>
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <WeatherDashboard />
                  </ErrorBoundary>
                
                } />
                <Route path="/city/:city" element={<CityPage />} />
              </Routes>
            </Layout>
            
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
