import type { Comunicacao, ComunicacaoForm } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  __v?: number;
};


function mapPostToComunicacao(post: Post): Comunicacao {
  return {
    id: post._id,
    titulo: post.title,
    autor: post.author,
    tipo: "Comunicado", 
    descricao: post.content,
    dataCriacao: new Date(post.createdAt),
    dataAtualizacao: new Date(post.createdAt), 
  };
}


export async function fetchComunicacoes(): Promise<Comunicacao[]> {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error("Erro ao buscar comunicações");
  const posts: Post[] = await response.json();
  return posts.map(mapPostToComunicacao);
}


export async function createComunicacao(
  data: ComunicacaoForm,
  token: string 
): Promise<Comunicacao> {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({
      title: data.titulo,
      content: data.descricao,
      author: data.autor,
    }),
  });
  if (!response.ok) throw new Error("Erro ao criar comunicação");
  const post: Post = await response.json();
  return mapPostToComunicacao(post);
}


export async function updateComunicacao(
  id: string,
  data: ComunicacaoForm,
  token: string 
): Promise<Comunicacao> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title: data.titulo,
      content: data.descricao,
      author: data.autor,
    }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar comunicação");
  const post: Post = await response.json();
  return mapPostToComunicacao(post);
}


export async function deleteComunicacao(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}` 
    }
  });
  if (!response.ok) throw new Error("Erro ao deletar comunicação");
}