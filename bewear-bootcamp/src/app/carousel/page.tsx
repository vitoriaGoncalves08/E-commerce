import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const brands = [
  { name: 'Adidas', logo: '/adidas.svg' },
  { name: 'Nike', logo: '/nike.svg' },
  { name: 'Puma', logo: '/puma.svg' },
  { name: 'Vans', logo: '/vans.svg' },
  { name: 'Converse', logo: '/converse.svg' },
  { name: 'New Balance', logo: '/newbalance.svg' },
  { name: 'Mizuno', logo: '/mizuno.svg' },
];

const CarouselPage = () => {
  return (
    <div className="space-y-6">
      <div className="px-5">
        <h3 className="font-semibold mb-4">Nossas marcas parceiras</h3>
        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {brands.map((brand, index) => (
                <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/6 px-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-32 flex items-center justify-center">
                    <div className="relative w-full h-16">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;