import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { MainLayout } from "./components/layout";
import { ComunicacoesPage } from "./pages/comunicacoes/ComunicacoesPage";
import { LoginPage } from "./pages/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Rota de login sem layout */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas com layout */}
          <Route
            path="/comunicacoes"
            element={
              <MainLayout>
                <ComunicacoesPage />
              </MainLayout>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
