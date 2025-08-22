import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() || '';

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await db.query.productTable.findMany({
      where: (products, { or, like, sql }) => 
        or(
          like(products.name, `%${query}%`),
          like(products.description, `%${query}%`),
          sql`to_tsvector('portuguese', ${products.name} || ' ' || ${products.description}) @@ plainto_tsquery('portuguese', ${query})`
        ),
      with: {
        variants: true
      },
      limit: 20
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
