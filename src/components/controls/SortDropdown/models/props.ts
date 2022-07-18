import { SortValue } from '../../../../models/sortValue';

export interface Props {
  sortValue: SortValue;
  onChange?: (sortValue: SortValue) => void;
}
