import React from 'react';
import { Props } from './models/props';
import styles from './styles.scss';

export const Button: React.FC<Props> = (props) => {
  return (
    <button type="button" className={styles['button']} title={props.title} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
