import productKnit from "@/assets/product-knit.jpg";
import productSlacks from "@/assets/product-slacks.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productCoat from "@/assets/product-coat.jpg";
import productShirt from "@/assets/product-shirt.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productJeans from "@/assets/product-jeans.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "그레이 캐시미어 니트",
    price: 89000,
    originalPrice: 120000,
    discount: 26,
    image: productKnit,
    category: "TOP",
    sizes: ["S", "M", "L"],
    colors: ["그레이", "베이지", "블랙"],
    description: "부드러운 캐시미어 소재의 오버핏 니트. 따뜻하면서도 세련된 실루엣을 연출할 수 있습니다. 데일리 아이템으로 추천합니다.",
  },
  {
    id: "2",
    name: "루즈핏 와이드 슬랙스",
    price: 48000,
    image: productSlacks,
    category: "BOTTOM",
    sizes: ["S", "M", "L", "XL"],
    colors: ["블랙", "차콜"],
    description: "편안한 착용감의 세미 와이드 슬랙스. 어떤 상의와도 잘 어울리는 베이직 아이템입니다.",
  },
  {
    id: "3",
    name: "미니멀 베이직 스니커즈",
    price: 79000,
    originalPrice: 98000,
    discount: 19,
    image: productSneakers,
    category: "ACC&SHOES",
    sizes: ["230", "240", "250", "260", "270"],
    colors: ["화이트", "블랙"],
    description: "깔끔한 디자인의 베이직 레더 스니커즈. 어떤 코디에도 잘 어울립니다.",
  },
  {
    id: "4",
    name: "베이지 오버핏 코트",
    price: 189000,
    originalPrice: 250000,
    discount: 24,
    image: productCoat,
    category: "OUTER",
    sizes: ["S", "M", "L"],
    colors: ["베이지", "카멜"],
    description: "고급스러운 울 블렌드 소재의 오버핏 코트. 클래식한 디자인으로 시즌 내내 활용 가능합니다.",
  },
  {
    id: "5",
    name: "스트라이프 카라 셔츠",
    price: 45000,
    image: productShirt,
    category: "TOP",
    sizes: ["S", "M", "L", "XL"],
    colors: ["네이비", "스카이블루"],
    description: "클래식한 스트라이프 패턴의 카라 셔츠. 캐주얼과 포멀 모두 활용 가능합니다.",
  },
  {
    id: "6",
    name: "베이직 코튼 티셔츠",
    price: 25000,
    image: productTshirt,
    category: "TOP",
    sizes: ["S", "M", "L", "XL"],
    colors: ["화이트", "블랙", "그레이"],
    description: "매일 입기 좋은 100% 코튼 베이직 티셔츠. 부드러운 촉감과 편안한 핏.",
  },
  {
    id: "7",
    name: "블랙 스키니 진",
    price: 55000,
    originalPrice: 69000,
    discount: 20,
    image: productJeans,
    category: "BOTTOM",
    sizes: ["S", "M", "L"],
    colors: ["블랙", "다크인디고"],
    description: "슬림한 실루엣의 스키니 데님. 스트레치 소재로 편안한 착용감을 제공합니다.",
  },
  {
    id: "8",
    name: "캐시미어 머플러",
    price: 35000,
    image: productKnit,
    category: "ACC&SHOES",
    sizes: ["FREE"],
    colors: ["그레이", "베이지", "블랙"],
    description: "부드러운 캐시미어 소재의 머플러. 겨울철 필수 아이템.",
  },
];

export const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR") + "원";
};
