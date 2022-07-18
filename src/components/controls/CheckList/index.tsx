import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { ArrayUtils } from '../../../utils/arrayUtils';
import { CheckBox } from '../CheckBox';
import { Props } from './models/props';
import { Orientation } from './models/orientation';
import styles from './styles.scss';

export const CheckList: React.FC<Props> = (props) => {
  return (
    <fieldset className={classNames(styles['check-list'], props.orientation === Orientation.Horizontal && styles['check-list_row'])}>
      <legend className={styles['title']}>{props.title}</legend>
      {props.items
        .sort((a, b) => a.value.localeCompare(b.value))
        .map((item) => (
          <CheckBox
            key={uuidv4()}
            checked={props.values.includes(item.value)}
            labelTemplate={item.valueTemplate}
            onChange={() => {
              props.onChange && props.onChange(ArrayUtils.addOrDeleteValue(props.values, item.value));
            }}
          />
        ))}
    </fieldset>
  );
};
