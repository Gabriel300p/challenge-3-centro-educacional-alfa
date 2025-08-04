import {
  SkeletonBox,
  SkeletonCircle,
  SkeletonLine,
} from "@shared/components/ui/skeleton";
import { motion } from "framer-motion";

// 🎯 Skeleton para carregamento de rota/página - Similar ao layout real
export function RouteSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Breadcrumb skeleton */}
      <div className="mx-4 pt-6 md:mx-8 md:pt-8 lg:mx-16 lg:pt-12">
        <SkeletonLine width="100px" className="h-4" />
      </div>

      {/* Page content skeleton */}
      <main className="mx-4 py-6 md:mx-8 md:py-8 lg:mx-16 lg:py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          {/* Header skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <SkeletonLine width="150px" className="h-7" />
            <SkeletonBox width="140px" height={36} className="rounded" />
          </div>

          {/* Search bar skeleton */}
          <div className="mb-6">
            <SkeletonBox width="300px" height={40} className="rounded" />
          </div>

          {/* Table skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {/* Table header */}
            <div className="grid grid-cols-6 gap-4 border-b pb-2">
              <SkeletonLine width="80%" className="h-4" />
              <SkeletonLine width="60%" className="h-4" />
              <SkeletonLine width="70%" className="h-4" />
              <SkeletonLine width="90%" className="h-4" />
              <SkeletonLine width="65%" className="h-4" />
              <SkeletonLine width="50%" className="h-4" />
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-6 gap-4 border-b border-slate-100 py-3"
              >
                <SkeletonLine width="85%" className="h-4" />
                <SkeletonLine width="70%" className="h-4" />
                <SkeletonLine width="60%" className="h-4" />
                <SkeletonLine width="95%" className="h-4" />
                <SkeletonLine width="50%" className="h-4" />
                <div className="flex gap-2">
                  <SkeletonCircle size={20} />
                  <SkeletonCircle size={20} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// 🎯 Skeleton para carregamento avançado com progressão
export function AdvancedLoadingSkeleton({
  stages = ["Carregando...", "Preparando dados...", "Quase pronto..."],
  currentStage = 0,
}: {
  stages?: string[];
  currentStage?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-6 py-12"
    >
      {/* Círculo de progresso animado */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-16 w-16 rounded-full border-4 border-slate-200">
          <div
            className="h-full w-full rounded-full border-4 border-blue-600 border-t-transparent"
            style={{
              transform: `rotate(${(currentStage / (stages.length - 1)) * 360}deg)`,
            }}
          />
        </div>
      </motion.div>

      {/* Texto do estágio atual */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-lg font-medium text-slate-900">
          {stages[currentStage] || stages[0]}
        </p>
        <div className="mt-2 flex justify-center space-x-2">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i <= currentStage ? "bg-blue-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 🎯 Skeleton para tabela genérica
export function TableSkeleton({
  columns = 5,
  rows = 5,
  hasActions = true,
}: {
  columns?: number;
  rows?: number;
  hasActions?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 rounded-lg border border-slate-200 p-5"
    >
      {/* Header */}
      <div
        className={`grid gap-4 border-b pb-2`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }, (_, i) => (
          <SkeletonLine key={i} width={`${60 + (i % 3) * 20}%`} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`grid gap-4 border-b border-slate-100 py-3`}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns - (hasActions ? 1 : 0) }, (_, j) => (
            <SkeletonLine key={j} width={`${70 + (j % 4) * 15}%`} />
          ))}
          {hasActions && (
            <div className="flex gap-2">
              <SkeletonCircle size={24} />
              <SkeletonCircle size={24} />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// 🎯 Skeleton para formulário genérico
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {Array.from({ length: fields }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-2"
        >
          <SkeletonLine width={`${60 + (i % 3) * 20}px`} className="h-4" />
          <SkeletonBox width="100%" height={40} />
        </motion.div>
      ))}

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4">
        <SkeletonBox width="80px" height={40} />
        <SkeletonBox width="100px" height={40} />
      </div>
    </motion.div>
  );
}

// 🎯 Skeleton para cards/lista
export function CardListSkeleton({ items = 6 }: { items?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: items }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-3 rounded-lg bg-white p-4 shadow"
        >
          <div className="flex items-center gap-3">
            <SkeletonCircle size={40} />
            <div className="flex-1">
              <SkeletonLine width="70%" />
              <SkeletonLine width="50%" className="mt-1" />
            </div>
          </div>
          <SkeletonLine width="100%" />
          <SkeletonLine width="80%" />
        </motion.div>
      ))}
    </motion.div>
  );
}
