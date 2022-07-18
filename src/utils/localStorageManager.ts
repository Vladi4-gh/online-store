import { Filter } from '../models/filter';
import { LocalStorageData } from '../models/localStorageData';
import { SortValue } from '../models/sortValue';

export class LocalStorageManager {
  private static itemName = 'online-store';

  static get filter(): Filter | undefined {
    return this.getData()?.filter;
  }

  static set filter(filter: Filter | undefined) {
    this.setData({
      filter,
    });
  }

  static get sortValue(): SortValue | undefined {
    return this.getData()?.sortValue;
  }

  static set sortValue(sortValue: SortValue | undefined) {
    this.setData({
      sortValue,
    });
  }

  static get cart(): number[] | undefined {
    return this.getData()?.cart;
  }

  static set cart(cart: number[] | undefined) {
    this.setData({
      cart,
    });
  }

  private static getData = (): LocalStorageData => {
    const localStorageRawData = localStorage.getItem(this.itemName);

    return localStorageRawData && JSON.parse(localStorageRawData);
  };

  private static setData = (value: LocalStorageData) => {
    const localStorageRawData = localStorage.getItem(this.itemName);
    const localStorageData: LocalStorageData = localStorageRawData ? JSON.parse(localStorageRawData) : {};

    localStorage.setItem(
      this.itemName,
      JSON.stringify({
        ...localStorageData,
        ...value,
      })
    );
  };
}
