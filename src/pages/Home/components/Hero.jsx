import {Button} from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
function Hero() {
  return (
    <section className="p-8 ml-16 mr-16">
      <div className="grid grid-cols-2 rounded-md min-h-60vh bg-[#f4f8f9]">
        <div className="flex flex-col justify-center p-16 gap-4">
        <Badge variant="destructive" className="w-fit bg-[#febc26] text-black">
              WEEKLY DISCOUNTS
        </Badge>


          <h1 className="text-6xl font-semibold">Premium Product Online Shop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
            suscipit est autem quia? Voluptatem?
          </p>
          <Button   className="w-fit" asChild>
          <a to="/shop">Shop Now</a>
          </Button>
        </div>
        <div className="relative">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt=""
            className="container h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
