import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SearchResults } from '@/components/search/search-results';
import { Header } from '@/components/common/header';
import { getCategories } from '@/data/categories/get';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || '';
  
  return {
    title: query ? `Resultados para: ${query}` : 'Busca',
    description: query ? `Resultados da busca por: ${query}` : 'Busque por produtos',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';

  const [categories] = await Promise.all([
    getCategories(),
  ]);

  if (!query) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Header />
        {/* Categorias - Desktop */}
              <nav className="hidden md:flex justify-center py-3 m-4">
                    <ul className="flex gap-18">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/category/${category.slug}`}
                            className="text-sm font-medium hover:text-primary transition-colors"
                            prefetch={false}
                            scroll={false}
                          >
                            {category.name.toUpperCase()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                </nav>
      <h1 className="text-2xl font-bold mb-6">
        Resultados para: <span className="text-primary">{query}</span>
      </h1>
      
      <Suspense>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
