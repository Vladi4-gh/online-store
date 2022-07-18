import React from 'react';
import { Props } from './models/props';
import styles from './styles.scss';

export const ColorBox: React.FC<Props> = (props) => {
  return <div className={styles['color-box']} style={{ backgroundColor: props.color }}></div>;
};
