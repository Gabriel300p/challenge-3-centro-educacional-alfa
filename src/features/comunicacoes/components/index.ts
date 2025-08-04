import { lazy } from "react";

// 🎯 Strategic Component Exports for Comunicacoes Feature
// Core components: loaded immediately, Heavy modal components: lazy-loaded

// Always-needed components (loaded immediately)
export { createColumns } from "./columns";
export { DataTable } from "./DataTable";

// 🚀 Lazy-loaded Modal Components (only load when modals are opened)
export const ModalComunicacao = lazy(() =>
  import("./ModalComunicacao").then((module) => ({
    default: module.ModalComunicacao,
  })),
);

export const ModalDeleteConfirm = lazy(() =>
  import("./ModalDeleteConfirm").then((module) => ({
    default: module.ModalDeleteConfirm,
  })),
);

// 📝 For single imports (better tree-shaking), prefer direct imports:
// import { ModalComunicacao } from '@features/comunicacoes/components/ModalComunicacao';
// import { DataTable } from '@features/comunicacoes/components/DataTable';
