interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  rating: number;
  isPrime?: boolean;
}

interface Item {
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  object: string;
  price: object;
  quantity: number;
}

interface Order {
  amount: number;
  id: string;
  images: string[];
  items: Item[];
  timestamp: number;
}

type Products = Product[];
type Orders = Order[];
