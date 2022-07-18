export interface Props {
  title: string;
  min: number;
  max: number;
  minDistance: number;
  minValue: number;
  maxValue: number;
  onChange?: (min: number, max: number) => void;
}
