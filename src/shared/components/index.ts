// 🎯 Most Used Shared Components
// Only exports frequently used components for clean imports

// Core App Components
export {
  FullPageLoader,
  LoadingSpinner,
  PageLoader,
} from "./common/LoadingSpinner";
export { ErrorBoundary } from "./errors/ErrorBoundary";

// Layout Components (frequently used)
export { MainLayout } from "./layout/MainLayout";
export { TopBar } from "./layout/TopBar";

// Most Used UI Components (from design system)
export { Button } from "./ui/button";
export {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
export { Input } from "./ui/input";

// 📝 For better tree-shaking, import specific components directly:
// import { SearchBar } from '@shared/components/common/SearchBar';
// import { Select } from '@shared/components/ui/select';
// import { Table } from '@shared/components/ui/table';
// import { Pagination } from '@shared/components/ui/pagination';
