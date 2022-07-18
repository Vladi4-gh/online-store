import React from 'react';
import ReactSlider from 'react-slider';
import { Props } from './models/props';
import styles from './styles.scss';

export const RangeSlider: React.FC<Props> = (props) => {
  return (
    <div className={styles['range-slider']}>
      <div className={styles['title']}>{props.title}</div>
      <ReactSlider
        className={styles['slider']}
        thumbClassName={styles['thumb']}
        trackClassName={styles['track']}
        min={props.min}
        max={props.max}
        value={[props.minValue, props.maxValue]}
        pearling
        minDistance={props.minDistance}
        onChange={(value) => {
          const min = value[0];
          const max = value[1];

          props.onChange && props.onChange(min, max);
        }}
      />
      <div className={styles['values']}>
        <div className={styles['min']}>{props.minValue}</div>
        <div className={styles['max']}>{props.maxValue}</div>
      </div>
    </div>
  );
};
