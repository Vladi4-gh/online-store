export interface Props {
  checked: boolean;
  labelTemplate: React.ReactNode;
  onChange?: (checked: boolean) => void;
}
