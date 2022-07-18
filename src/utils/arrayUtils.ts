export class ArrayUtils {
  static getUniqueValues = <T>(values: T[]): T[] => {
    return Array.from(new Set(values));
  };

  static addOrDeleteValue = <T>(values: T[], value: T): T[] => {
    return values.includes(value) ? values.filter((x) => x !== value) : [...values, value];
  };
}
