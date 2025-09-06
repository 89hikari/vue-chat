export interface IInput {
  label?: string;
  type?: string;
  placeholder?: string;
  fetchResults?: (q: string) => Promise<unknown[]>;
  debounceMs?: number;
}
