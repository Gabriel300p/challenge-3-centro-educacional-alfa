import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { MainLayout } from "./components/layout";
import { ComunicacoesPage } from "./pages/comunicacoes/ComunicacoesPage";
import { LoginPage } from "./pages/login/LoginPage";
import { AuthProvider } from "./providers/AuthProvider";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { PostDetailsPage } from "./pages/postdetails/PostDetailsPage";
import { AulasPage } from "./pages/aulas/AulasPage";
import { NovaAulaPage } from "./pages/aulas/services/NovaAulaPage";
import { AulaPresencaPage } from "./pages/aula-presenca/aulaPresencaPage";
import { ConfirmarPresenca } from "./pages/aula-presenca/components/ConfirmarPresenca";

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
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/inicio"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AulaPresencaPage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/aulas/:id/editar"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <NovaAulaPage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <ComunicacoesPage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/aulas"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AulasPage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/aulas/nova"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <NovaAulaPage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route path="/presenca/confirmar" element={<ConfirmarPresenca />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;