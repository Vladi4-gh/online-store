import { Filter } from '../models/filter';
import { SortValue } from '../models/sortValue';

export interface LocalStorageData {
  filter?: Filter;
  sortValue?: SortValue;
  cart?: number[];
}
