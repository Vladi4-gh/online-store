import { Good } from '../../../models/good';
import { SortValue } from '../../../models/sortValue';

export interface Props {
  goods: Good[];
  sortValue: SortValue;
  cart: number[];
  onSortValueChange?: (sortValue: SortValue) => void;
  onGoodItemClick?: (goodId: number) => void;
}
