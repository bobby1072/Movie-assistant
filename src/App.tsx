import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { movieAssistantTheme } from "./utils/theme";
const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    document.title = "movie assistant";
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={movieAssistantTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainPage />} path="/" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
