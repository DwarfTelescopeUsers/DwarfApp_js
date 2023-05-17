export function isNumber(node: number | string): node is number {
  return typeof node === "number";
}

export function isString(node: number | string): node is string {
  return typeof node === "string";
}
