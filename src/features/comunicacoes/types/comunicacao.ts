// Comunicação types
export interface Comunicacao {
  id: string;
  titulo: string;
  autor: string;
  tipo: "Comunicado" | "Aviso" | "Notícia";
  descricao: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ComunicacaoForm {
  titulo: string;
  autor: string;
  tipo: "Comunicado" | "Aviso" | "Notícia";
  descricao: string;
}
