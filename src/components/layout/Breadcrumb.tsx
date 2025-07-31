import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
          {item.href && !item.isActive ? (
            <Link
              to={item.href}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                item.isActive ? "text-gray-900 font-medium" : "text-gray-500"
              }
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
