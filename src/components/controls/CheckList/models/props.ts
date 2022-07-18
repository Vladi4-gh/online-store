import { CheckListItem } from './checkListItem';
import { Orientation } from './orientation';

export interface Props {
  title: string;
  items: CheckListItem[];
  values: string[];
  orientation?: Orientation;
  onChange?: (value: string[]) => void;
}
