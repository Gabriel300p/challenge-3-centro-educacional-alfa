export interface Comunicacao {
  id: string;
  titulo: string;
  autor: string;
  tipo: "Comunicado" | "Aviso";
  descricao: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ComunicacaoForm {
  titulo: string;
  autor: string;
  tipo: "Comunicado" | "Aviso";
  descricao: string;
}
