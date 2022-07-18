export interface Good {
  id: number;
  name: string;
  description?: string;
  color: string;
  size: string;
  manufacturer: string;
  yearOfIssue: number;
  price: number;
  availableQuantity: number;
  isPopular: boolean;
  imageName: string;
}
