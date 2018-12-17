export interface IColumn<T> {
  header: (x: T) => any;
  item?: (x: T) => any;
  sort?: (x: T, y: T) => number;
  rotated?: boolean;
}
