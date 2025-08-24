import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckCircle, Circle, Package, CreditCard, MapPin } from "lucide-react";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
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
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
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
                <div className="flex flex-col items-center z-10 bg-white p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium mt-1">Identificação</span>
                </div>
                
                {/* Line 2 */}
                <div className="flex-1 h-0.5 bg-green-500"></div>
                
                {/* Step 3: Pagamento */}
                <div className="flex flex-col items-center z-10 bg-white p-2 rounded-full border-2 border-green-500">
                  <CreditCard className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium mt-1">Pagamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Confirmation */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Confirmação</h1>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Endereço de entrega</h2>
                  <p className="text-muted-foreground">
                    {formatAddress(cart.shippingAddress)}
                  </p>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="font-medium text-lg mb-4">Método de entrega</h3>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Package className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium">Entrega Padrão</p>
                      <p className="text-sm text-muted-foreground">Receba em até 5 dias úteis</p>
                    </div>
                  </div>
                </div>

                <FinishOrderButton />
              </CardContent>
            </Card>
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

export default ConfirmationPage;
