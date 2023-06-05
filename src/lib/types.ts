export interface IProduct {
  _id: string;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  featured: boolean;
  category: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
