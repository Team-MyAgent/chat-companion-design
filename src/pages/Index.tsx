import heroBanner from "@/assets/hero-banner.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full aspect-[16/7] max-h-[520px] overflow-hidden">
        <img
          src={heroBanner}
          alt="2026 S/S 신상 컬렉션"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12">
          <p className="text-primary-foreground text-[10px] tracking-[0.3em] uppercase mb-2 font-light">
            2026 S/S Collection
          </p>
          <h1 className="text-primary-foreground text-2xl sm:text-3xl font-light tracking-wide">
            New Arrivals
          </h1>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-secondary rounded-lg px-6 py-4 text-center">
          <p className="text-xs text-foreground font-medium tracking-wider">
            🎉 신규 회원가입 시 <span className="font-bold">15% 할인쿠폰</span> 즉시 지급
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-center mb-8 text-foreground">
          WEEKLY BEST
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
