'use client';

import { useEffect, useState } from 'react';
import ProductList from '../common/product-list';

import { productTable, productVariantTable } from "@/db/schema";

type Product = typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[];
};

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setProducts([]);
        return;
      }
      
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setProducts([]);    
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-600">Nenhum produto encontrado para: <span className="font-semibold">{query}</span></h2>
        <p className="mt-2 text-gray-500">Tente usar palavras-chave diferentes ou verifique a ortografia.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>
      <ProductList 
        title="Resultados da busca" 
        products={products} 
      />
    </div>
  );
}
