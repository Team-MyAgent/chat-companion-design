import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, formatPrice } from "@/data/products";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground text-sm">상품을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-3 h-3" />
          목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
              {product.category}
            </p>
            <h1 className="text-lg font-semibold text-foreground mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              {product.discount && (
                <span className="text-sm font-bold text-destructive">{product.discount}%</span>
              )}
              <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Size */}
            <div className="mb-4">
              <p className="text-xs font-medium text-foreground mb-2">사이즈</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs font-medium text-foreground mb-2">색상</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-primary text-primary-foreground text-xs font-medium py-3 rounded hover:opacity-90 transition-opacity">
                구매하기
              </button>
              <button className="flex-1 border border-primary text-foreground text-xs font-medium py-3 rounded hover:bg-secondary transition-colors">
                장바구니
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-border pt-6">
              <h3 className="text-xs font-semibold text-foreground mb-2">상품 설명</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Reviews */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-xs font-semibold text-foreground mb-3">리뷰</h3>
              <div className="space-y-3">
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-foreground text-foreground" : "text-border"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">김*영</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">소재가 정말 좋고 핏도 예뻐요! 강추합니다.</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < 5 ? "fill-foreground text-foreground" : "text-border"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">이*수</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">배송도 빠르고 퀄리티도 좋아요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
