import "server-only";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";
//DTO (DATA TRANSFER OBJECT)

// interface ProductDTO {
//  id: string;
//  name: string;
//  description: string;
//  price: number;
//  image: string;
//  category: string;
//  createdAt: string;
// }

// export const getProducts = async (): Promise<Product[]> => {
export const getProductsWithVariants = async () => {
    const products = await db.query.productTable.findMany({
        with: {
            variants: true,
        },
    });    

    return products;
};

export const getNewlyCreatedProducts = async () => {
const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  return newlyCreatedProducts;
};