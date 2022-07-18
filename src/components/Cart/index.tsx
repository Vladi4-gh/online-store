import React from 'react';
import { Props } from './models/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.scss';

export const Cart: React.FC<Props> = (props) => {
  return (
    <div className={styles['cart']}>
      {!!props.numberOfGoods && <div className={styles['number-of-goods']}>{props.numberOfGoods}</div>}
      <FontAwesomeIcon className={styles['icon']} icon={faCartShopping} title={`Товаров в корзине: ${props.numberOfGoods}`}></FontAwesomeIcon>
    </div>
  );
};
