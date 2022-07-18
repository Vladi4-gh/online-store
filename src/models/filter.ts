export interface Filter {
  searchText: string;
  minPrice: number;
  maxPrice: number;
  minAvailableQuantity: number;
  maxAvailableQuantity: number;
  minYearOfIssue: number;
  maxYearOfIssue: number;
  manufacturers: string[];
  colors: string[];
  sizes: string[];
  isOnlyPopular: boolean;
}
