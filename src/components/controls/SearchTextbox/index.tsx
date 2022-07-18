import React from 'react';
import { Props } from './models/props';
import styles from './styles.scss';

export const SearchTextbox: React.FC<Props> = (props) => {
  return (
    <div className={styles['search-textbox']}>
      <input type="search" placeholder="Поиск..." value={props.searchText} autoFocus onChange={(e) => props.onChange && props.onChange(e.target.value)} />
    </div>
  );
};
