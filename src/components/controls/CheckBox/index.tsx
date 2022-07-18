import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Props } from './models/props';
import styles from './styles.scss';

export const CheckBox: React.FC<Props> = (props) => {
  const id = uuidv4();

  return (
    <div className={styles['check-box']}>
      <input
        type="checkbox"
        id={id}
        checked={props.checked}
        onChange={(e) => {
          props.onChange && props.onChange(e.target.checked);
        }}
      />
      <label htmlFor={id}>{props.labelTemplate}</label>
    </div>
  );
};
