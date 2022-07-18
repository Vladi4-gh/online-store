import { Good } from '../../../models/good';

export interface Props {
  goods: Good[];
  cart: number[];
  onGoodItemClick?: (goodId: number) => void;
}
