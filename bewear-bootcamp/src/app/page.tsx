import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { getCategories } from "@/data/categories/get";
import { getProductsWithVariants } from "@/data/produts/gets";
import { getNewlyCreatedProducts } from "@/data/produts/gets";

import CarouselPage from "./carousel/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);

  return (
    <>
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

      {/* Categorias - Mobile */}
      <div className="md:hidden py-4 px-4">
        <div className="relative">
          <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                asChild
                variant="outline"
                className="shrink-0 rounded-full text-sm font-medium"
              >
                <Link href={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <CarouselPage />

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
