import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-foreground truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.discount && (
            <span className="text-xs font-bold text-destructive">{product.discount}%</span>
          )}
          <span className="text-xs font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
