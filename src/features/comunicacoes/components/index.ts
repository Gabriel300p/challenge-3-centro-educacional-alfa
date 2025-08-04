// 🎯 Strategic Component Exports for Comunicacoes Feature
// Only exports components that are frequently imported together

// Core Table Components (often used together)
export { createColumns } from "./columns";
export { DataTable } from "./DataTable";

// Modal Components (often used together)
export { ModalComunicacao } from "./ModalComunicacao";
export { ModalDeleteConfirm } from "./ModalDeleteConfirm";

// 📝 For single imports (better tree-shaking), prefer direct imports:
// import { ModalComunicacao } from '@features/comunicacoes/components/ModalComunicacao';
// import { DataTable } from '@features/comunicacoes/components/DataTable';
