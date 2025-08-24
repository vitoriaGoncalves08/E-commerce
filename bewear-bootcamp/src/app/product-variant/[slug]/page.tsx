import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <div className="space-y-8">
      <Header />
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Column - Product Image */}
          <div className="md:sticky md:top-4 md:w-1/2">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              width={600}
              height={800}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="md:w-1/2 px-4">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {productVariant.product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {productVariant.name}
                </p>
                <p className="text-2xl font-bold mt-4">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </p>
              </div>

              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />

              <ProductActions productVariantId={productVariant.id} />

              <div className="pt-6 border-t">
                <h3 className="font-medium text-lg mb-4">Descrição</h3>
                <p className="text-muted-foreground">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductVariantPage;
