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
      
      {/* Web View - Visible on md screens and up */}
      <div className="hidden md:block">
        {/* Categorias - Desktop */}
        <nav className="flex justify-center py-3 m-4">
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
        
        {/* Web Banner */}
        <div className="flex justify-center py-3 m-4">
          <div className="px-5 w-full max-w-7xl">
            <Image
              src="/banner-01-web.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile View - Visible on screens smaller than md */}
      <div className="md:hidden">
        <div className="flex justify-center py-3 px-4">
          <div className="w-full">
            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">

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

        {/* Web Only - Grid Layout */}
        <div className="hidden md:block">
          <div className="flex justify-center py-1 m-2 px-5">
            <div className="grid grid-cols-3 gap-4 w-full max-w-7xl">
              {/* Left Column - 1/3 width */}
              <div className="flex flex-col gap-4">
                <Image
                  src="/tenisbanner1.svg"
                  alt="Tênis esportivo"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
                <Image
                  src="/tenisbanner2.svg"
                  alt="Tênis casual"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>

              {/* Right Column - 2/3 width */}
              <div className="col-span-2">
                <Image
                  src="/banner02.png"
                  alt="Coleção de tênis"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>


        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
