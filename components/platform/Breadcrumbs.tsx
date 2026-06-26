import React from "react";
import Link from "next/link";

interface Crumb {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 flex text-xs font-semibold text-gray-500 bg-gray-50" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center">
              <span className="mx-1.5 text-gray-300">/</span>
              {isLast ? (
                <span className="text-gray-400 cursor-default truncate max-w-[180px] sm:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
