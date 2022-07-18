import React from 'react';
import { Cart } from '../Cart';
import { Props } from './models/props';
import styles from './styles.scss';

export const Header: React.FC<Props> = (props) => {
  return (
    <header className={styles['header']}>
      <h1 title="КУПИ КУПИ КУПИ КУПИ КУПИ ПОДУШКУ НУ БУДЬ ЖЕЖ ТЫ ЧЕЛОВЕКОМ">МАГАЗИН ПОДУШЕК</h1>
      <Cart numberOfGoods={props.numberOfGoods} />
    </header>
  );
};
