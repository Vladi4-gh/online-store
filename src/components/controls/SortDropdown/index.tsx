import React from 'react';
import { Props } from './models/props';
import { SortValue } from '../../../models/sortValue';
import styles from './styles.scss';

export const SortDropdown: React.FC<Props> = (props) => {
  return (
    <div className={styles['sort-dropdown']}>
      <select
        value={props.sortValue}
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value as SortValue);
        }}
      >
        <option value={SortValue.NameAsc}>По названию △</option>
        <option value={SortValue.NameDesc}>По названию ▽</option>
        <option value={SortValue.PopularityAsc}>По популярности △</option>
        <option value={SortValue.PopularityDesc}>По популярности ▽</option>
        <option value={SortValue.PriceAsc}>По цене △</option>
        <option value={SortValue.PriceDesc}>По цене ▽</option>
        <option value={SortValue.AvailableQuantityAsc}>По количеству △</option>
        <option value={SortValue.AvailableQuantityDesc}>По количеству ▽</option>
        <option value={SortValue.YearOfIssueAsc}>По году △</option>
        <option value={SortValue.YearOfIssueDesc}>По году ▽</option>
      </select>
    </div>
  );
};
