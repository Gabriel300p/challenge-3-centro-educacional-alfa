// 🎯 Strategic Hook Exports for Comunicacoes Feature
// Only exports hooks that are commonly used together

// Main CRUD hooks (often used together in components)
export { useComunicacoes } from "./useComunicacoes";
export { useModals } from "./useModals";

// Utility hooks (can be imported separately)
export { useSearch } from "./useSearch";

// 📝 For better performance and explicit dependencies, prefer direct imports:
// import { useComunicacoes } from '@features/comunicacoes/hooks/useComunicacoes';
// import { useSearch } from '@features/comunicacoes/hooks/useSearch';
