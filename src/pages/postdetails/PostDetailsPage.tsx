import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchComunicacoes } from "../comunicacoes/services/comunicacao.service";
import { MainLayout } from "@/components/layout/MainLayout";
import { buttonVariants } from "@/components/ui/button-variants";

export function PostDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const posts = await fetchComunicacoes();
      return posts.find(p => p.id === id);
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="p-8">Carregando...</div>;
  if (error || !post) return <div className="p-8">Post não encontrado.</div>;

  return (
    <MainLayout>
      <div className="p-8">
        <Link to="/posts" className={buttonVariants({ variant: "link" })}>
          ← Voltar para a lista
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-4">{post.titulo}</h1>
        <p className="text-sm text-gray-500 mb-6">Por: {post.autor} em {post.dataCriacao.toLocaleDateString()}</p>
        <p className="text-lg leading-relaxed">{post.descricao}</p>
      </div>
    </MainLayout>
  );
}