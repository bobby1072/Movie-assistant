import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
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
        <HashRouter>
          <Routes>
            <Route element={<MainPage />} path="/" />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
