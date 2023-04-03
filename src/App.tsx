import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    document.title = "movie assistant";
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<MainPage />} path="/" />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
