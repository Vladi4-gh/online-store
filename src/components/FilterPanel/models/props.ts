import { Filter } from '../../../models/filter';
import { RangeFilterConfiguration } from '../../../models/rangeFilterConfiguration';
import { ValuesFilterConfiguration } from '../../../models/valuesFilterConfiguration';

export interface Props {
  filter: Filter;
  priceRangeFilterConfiguration: RangeFilterConfiguration;
  availableQuantityRangeFilterConfiguration: RangeFilterConfiguration;
  yearOfIssueRangeFilterConfiguration: RangeFilterConfiguration;
  manufacturerValuesFilterConfiguration: ValuesFilterConfiguration;
  colorValuesFilterConfiguration: ValuesFilterConfiguration;
  sizeValuesFilterConfiguration: ValuesFilterConfiguration;
  onFilterChange?: (filter: Filter) => void;
  onResetFilterClick?: () => void;
  onResetAllClick?: () => void;
}
