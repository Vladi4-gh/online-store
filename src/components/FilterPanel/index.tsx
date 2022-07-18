import React from 'react';
import { ColorBox } from '../ColorBox';
import { Button } from '../controls/Button';
import { CheckBox } from '../controls/CheckBox';
import { CheckList } from '../controls/CheckList';
import { Orientation } from '../controls/CheckList/models/orientation';
import { RangeSlider } from '../controls/RangeSlider';
import { SearchTextbox } from '../controls/SearchTextbox';
import { Props } from './models/props';
import styles from './styles.scss';

export const FilterPanel: React.FC<Props> = (props) => {
  return (
    <aside className={styles['filters']}>
      <SearchTextbox
        searchText={props.filter.searchText}
        onChange={(searchText) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, searchText });
        }}
      />
      <RangeSlider
        title="Цена"
        min={props.priceRangeFilterConfiguration.min}
        max={props.priceRangeFilterConfiguration.max}
        minDistance={props.priceRangeFilterConfiguration.minDistance}
        minValue={props.filter.minPrice}
        maxValue={props.filter.maxPrice}
        onChange={(min, max) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, minPrice: min, maxPrice: max });
        }}
      />
      <RangeSlider
        title="Количество"
        min={props.availableQuantityRangeFilterConfiguration.min}
        max={props.availableQuantityRangeFilterConfiguration.max}
        minDistance={props.availableQuantityRangeFilterConfiguration.minDistance}
        minValue={props.filter.minAvailableQuantity}
        maxValue={props.filter.maxAvailableQuantity}
        onChange={(min, max) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, minAvailableQuantity: min, maxAvailableQuantity: max });
        }}
      />
      <RangeSlider
        title="Год производства"
        min={props.yearOfIssueRangeFilterConfiguration.min}
        max={props.yearOfIssueRangeFilterConfiguration.max}
        minDistance={props.yearOfIssueRangeFilterConfiguration.minDistance}
        minValue={props.filter.minYearOfIssue}
        maxValue={props.filter.maxYearOfIssue}
        onChange={(min, max) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, minYearOfIssue: min, maxYearOfIssue: max });
        }}
      />
      <CheckList
        title="Производитель"
        items={props.manufacturerValuesFilterConfiguration.values.map((value) => ({
          value,
          valueTemplate: value,
        }))}
        values={props.filter.manufacturers}
        onChange={(values) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, manufacturers: values });
        }}
      />
      <CheckList
        title="Цвет"
        items={props.colorValuesFilterConfiguration.values.map((value) => ({
          value,
          valueTemplate: <ColorBox color={value} />,
        }))}
        values={props.filter.colors}
        orientation={Orientation.Horizontal}
        onChange={(values) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, colors: values });
        }}
      />
      <CheckList
        title="Размер"
        items={props.sizeValuesFilterConfiguration.values.map((value) => ({
          value,
          valueTemplate: <>{value} см</>,
        }))}
        values={props.filter.sizes}
        onChange={(values) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, sizes: values });
        }}
      />
      <CheckBox
        checked={props.filter.isOnlyPopular}
        labelTemplate={'Только популярные'}
        onChange={(checked) => {
          props.onFilterChange && props.onFilterChange({ ...props.filter, isOnlyPopular: checked });
        }}
      />
      <Button title={'Только фильтры'} onClick={props.onResetFilterClick}>
        Сброс фильтров
      </Button>
      <Button title={'Фильтры, сортировка, корзина'} onClick={props.onResetAllClick}>
        Сброс настроек
      </Button>
    </aside>
  );
};
