import React from 'react';
import { GoodsGrid } from '../GoodsGrid';
import { SortDropdown } from '../controls/SortDropdown';
import { Props } from './models/props';
import styles from './styles.scss';

export const GoodsPanel: React.FC<Props> = (props) => {
  return (
    <div className={styles['goods-panel']}>
      {!props.goods.length && <div className={styles['no-items']}>Извините, совпадений не обнаружено</div>}
      {!!props.goods.length && (
        <>
          <div className={styles['header']}>
            <div className={styles['goods-number']}>Товаров: {props.goods.length}</div>
            <SortDropdown sortValue={props.sortValue} onChange={props.onSortValueChange} />
          </div>
          <GoodsGrid goods={props.goods} cart={props.cart} onGoodItemClick={props.onGoodItemClick} />
        </>
      )}
    </div>
  );
};
