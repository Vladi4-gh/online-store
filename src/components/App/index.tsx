import React, { useEffect, useMemo, useState } from 'react';
import { LocalStorageManager } from '../../utils/localStorageManager';
import { ArrayUtils } from '../../utils/arrayUtils';
import { GoodsPanel } from '../GoodsPanel';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { FilterPanel } from '../FilterPanel';
import { Filter } from '../../models/filter';
import { RangeFilterConfiguration } from '../../models/rangeFilterConfiguration';
import { RangeFilterType } from '../../models/rangeFilterType';
import { ValuesFilterConfiguration } from '../../models/valuesFilterConfiguration';
import { ValuesFilterType } from '../../models/valuesFilterType';
import { Good } from '../../models/good';
import { SortValue } from '../../models/sortValue';
import data from '../../assets/data/goods.json';
import styles from './styles.scss';

const getRangeFilterConfiguration = (goods: Good[], type: RangeFilterType): RangeFilterConfiguration => {
  let specification: (good: Good) => number;
  let minDistance: number;

  switch (type) {
    case RangeFilterType.Price:
      specification = (good) => good.price;
      minDistance = 100;

      break;
    case RangeFilterType.AvailableQuantity:
      specification = (good) => good.availableQuantity;
      minDistance = 3;

      break;
    case RangeFilterType.YearOfIssue:
      specification = (good) => good.yearOfIssue;
      minDistance = 1;

      break;
  }

  const uniqueValues = ArrayUtils.getUniqueValues(goods.map(specification));

  return {
    min: Math.min(...uniqueValues),
    max: Math.max(...uniqueValues),
    minDistance,
  };
};

const getValuesFilterConfiguration = (goods: Good[], type: ValuesFilterType): ValuesFilterConfiguration => {
  let specification: (good: Good) => string;

  switch (type) {
    case ValuesFilterType.Manufacturer:
      specification = (good) => good.manufacturer;

      break;
    case ValuesFilterType.Color:
      specification = (good) => good.color;

      break;
    case ValuesFilterType.Size:
      specification = (good) => good.size;

      break;
  }

  const uniqueValues = ArrayUtils.getUniqueValues(goods.map(specification));

  return {
    values: uniqueValues,
  };
};

const getFilter = (defaultValues: Filter): Filter => {
  const filter = LocalStorageManager.filter;

  return {
    searchText: filter?.searchText ?? defaultValues.searchText,
    minPrice: filter?.minPrice ?? defaultValues.minPrice,
    maxPrice: filter?.maxPrice ?? defaultValues.maxPrice,
    minAvailableQuantity: filter?.minAvailableQuantity ?? defaultValues.minAvailableQuantity,
    maxAvailableQuantity: filter?.maxAvailableQuantity ?? defaultValues.maxAvailableQuantity,
    minYearOfIssue: filter?.minYearOfIssue ?? defaultValues.minYearOfIssue,
    maxYearOfIssue: filter?.maxYearOfIssue ?? defaultValues.maxYearOfIssue,
    manufacturers: filter?.manufacturers ?? defaultValues.manufacturers,
    colors: filter?.colors ?? defaultValues.colors,
    sizes: filter?.sizes ?? defaultValues.sizes,
    isOnlyPopular: filter?.isOnlyPopular ?? defaultValues.isOnlyPopular,
  };
};

const getSortValue = (defaultValue: SortValue): SortValue => LocalStorageManager.sortValue ?? defaultValue;

const getCart = (defaultValue: number[]): number[] => LocalStorageManager.cart ?? defaultValue;

const filterGoods = (goods: Good[], filter: Filter): Good[] => {
  const textSpecification = (good: Good, filter: Filter): boolean => {
    const searchText = filter.searchText.toLowerCase();

    return good.name.toLowerCase().includes(searchText) || good.description?.toLowerCase().includes(searchText) || false;
  };
  const priceSpecification = (good: Good, filter: Filter): boolean => good.price >= filter.minPrice && good.price <= filter.maxPrice;
  const availableQuantitySpecification = (good: Good, filter: Filter): boolean => good.availableQuantity >= filter.minAvailableQuantity && good.availableQuantity <= filter.maxAvailableQuantity;
  const yearOfIssueSpecification = (good: Good, filter: Filter): boolean => good.yearOfIssue >= filter.minYearOfIssue && good.yearOfIssue <= filter.maxYearOfIssue;
  const manufacturersSpecification = (good: Good, filter: Filter): boolean => (filter.manufacturers.length ? filter.manufacturers.includes(good.manufacturer) : true);
  const colorsSpecification = (good: Good, filter: Filter): boolean => (filter.colors.length ? filter.colors.includes(good.color) : true);
  const sizesSpecification = (good: Good, filter: Filter): boolean => (filter.sizes.length ? filter.sizes.includes(good.size) : true);
  const isOnlyPopularSpecification = (good: Good, filter: Filter): boolean => (filter.isOnlyPopular ? good.isPopular : true);
  const specifications = [textSpecification, priceSpecification, availableQuantitySpecification, yearOfIssueSpecification, manufacturersSpecification, colorsSpecification, sizesSpecification, isOnlyPopularSpecification];

  return goods.filter((good) => specifications.every((specification) => specification(good, filter)));
};

const sortGoods = (goods: Good[], sortValue: SortValue): Good[] => {
  switch (sortValue) {
    case SortValue.NameAsc:
      return goods.sort((a, b) => a.name.localeCompare(b.name));
    case SortValue.NameDesc:
      return goods.sort((a, b) => b.name.localeCompare(a.name));
    case SortValue.PopularityAsc:
      return goods.sort((a) => (a.isPopular ? 1 : -1));
    case SortValue.PopularityDesc:
      return goods.sort((a) => (a.isPopular ? -1 : 1));
    case SortValue.PriceAsc:
      return goods.sort((a, b) => a.price - b.price);
    case SortValue.PriceDesc:
      return goods.sort((a, b) => b.price - a.price);
    case SortValue.AvailableQuantityAsc:
      return goods.sort((a, b) => a.availableQuantity - b.availableQuantity);
    case SortValue.AvailableQuantityDesc:
      return goods.sort((a, b) => b.availableQuantity - a.availableQuantity);
    case SortValue.YearOfIssueAsc:
      return goods.sort((a, b) => a.yearOfIssue - b.yearOfIssue);
    case SortValue.YearOfIssueDesc:
      return goods.sort((a, b) => b.yearOfIssue - a.yearOfIssue);
    default:
      return goods;
  }
};

export const App: React.FC = () => {
  const goodsData: Good[] = data;
  const priceRangeFilterConfiguration = useMemo(() => getRangeFilterConfiguration(goodsData, RangeFilterType.Price), [goodsData]);
  const availableQuantityRangeFilterConfiguration = useMemo(() => getRangeFilterConfiguration(goodsData, RangeFilterType.AvailableQuantity), [goodsData]);
  const yearOfIssueRangeFilterConfiguration = useMemo(() => getRangeFilterConfiguration(goodsData, RangeFilterType.YearOfIssue), [goodsData]);
  const manufacturerValuesFilterConfiguration = useMemo(() => getValuesFilterConfiguration(goodsData, ValuesFilterType.Manufacturer), [goodsData]);
  const colorValuesFilterConfiguration = useMemo(() => getValuesFilterConfiguration(goodsData, ValuesFilterType.Color), [goodsData]);
  const sizeValuesFilterConfiguration = useMemo(() => getValuesFilterConfiguration(goodsData, ValuesFilterType.Size), [goodsData]);
  const defaultFilter: Filter = {
    searchText: '',
    minPrice: priceRangeFilterConfiguration.min,
    maxPrice: priceRangeFilterConfiguration.max,
    minAvailableQuantity: availableQuantityRangeFilterConfiguration.min,
    maxAvailableQuantity: availableQuantityRangeFilterConfiguration.max,
    minYearOfIssue: yearOfIssueRangeFilterConfiguration.min,
    maxYearOfIssue: yearOfIssueRangeFilterConfiguration.max,
    manufacturers: [],
    colors: [],
    sizes: [],
    isOnlyPopular: false,
  };
  const defaultSortValue = SortValue.PopularityDesc;
  const defaultCart: number[] = [];
  const maxCartCapacity = 20;
  const [filter, setFilter] = useState(getFilter(defaultFilter));
  const [sortValue, setSortValue] = useState(getSortValue(defaultSortValue));
  const [cart, setCart] = useState(getCart(defaultCart));

  useEffect(() => {
    LocalStorageManager.filter = filter;
  }, [filter]);
  useEffect(() => {
    LocalStorageManager.sortValue = sortValue;
  }, [sortValue]);
  useEffect(() => {
    LocalStorageManager.cart = cart;
  }, [cart]);

  const goods = sortGoods(filterGoods(goodsData, filter), sortValue);

  return (
    <div className={styles['app']}>
      <div className={styles['container']}>
        <Header numberOfGoods={cart.length} />
        <main className={styles['main']}>
          <FilterPanel
            filter={filter}
            priceRangeFilterConfiguration={priceRangeFilterConfiguration}
            availableQuantityRangeFilterConfiguration={availableQuantityRangeFilterConfiguration}
            yearOfIssueRangeFilterConfiguration={yearOfIssueRangeFilterConfiguration}
            manufacturerValuesFilterConfiguration={manufacturerValuesFilterConfiguration}
            colorValuesFilterConfiguration={colorValuesFilterConfiguration}
            sizeValuesFilterConfiguration={sizeValuesFilterConfiguration}
            onFilterChange={(filter) => {
              setFilter(filter);
            }}
            onResetFilterClick={() => {
              setFilter(defaultFilter);
            }}
            onResetAllClick={() => {
              setFilter(defaultFilter);
              setSortValue(defaultSortValue);
              setCart(defaultCart);
            }}
          />
          <GoodsPanel
            goods={goods}
            sortValue={sortValue}
            cart={cart}
            onSortValueChange={(sortValue) => {
              setSortValue(sortValue);
            }}
            onGoodItemClick={(goodId) => {
              const newCart = ArrayUtils.addOrDeleteValue(cart, goodId);

              if (newCart.length <= maxCartCapacity) {
                setCart(newCart);
              } else {
                alert(`В корзину нельзя добавить больше ${maxCartCapacity} товаров`);
              }
            }}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};
