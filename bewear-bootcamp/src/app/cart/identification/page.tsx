import { eq } from "drizzle-orm";
import { CheckCircle, Circle, MapPin } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Timeline */}
      <div className="bg-gray-50 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between relative">
                {/* Step 1: Sacola */}
                <div className="flex flex-col items-center z-10 bg-white p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium mt-1">Sacola</span>
                </div>
                
                {/* Line 1 */}
                <div className="flex-1 h-0.5 bg-green-500"></div>
                
                {/* Step 2: Identificação */}
                <div className="flex flex-col items-center z-10 bg-white p-2 rounded-full border-2 border-green-500">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium mt-1">Identificação</span>
                </div>
                
                {/* Line 2 */}
                <div className="flex-1 h-0.5 bg-gray-200"></div>
                
                {/* Step 3: Pagamento */}
                <div className="flex flex-col items-center z-10 bg-white p-2 rounded-full">
                  <Circle className="h-6 w-6 text-gray-300" />
                  <span className="text-sm text-gray-400 mt-1">Pagamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Addresses */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Identificação</h1>
            <Addresses
              shippingAddresses={shippingAddresses}
              defaultShippingAddressId={cart.shippingAddress?.id || null}
            />
          </div>

          {/* Right Column - Cart Summary */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="sticky top-4">
              <CartSummary
                subtotalInCents={cartTotalInCents}
                totalInCents={cartTotalInCents}
                products={cart.items.map((item) => ({
                  id: item.productVariant.id,
                  name: item.productVariant.product.name,
                  variantName: item.productVariant.name,
                  quantity: item.quantity,
                  priceInCents: item.productVariant.priceInCents,
                  imageUrl: item.productVariant.imageUrl,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
