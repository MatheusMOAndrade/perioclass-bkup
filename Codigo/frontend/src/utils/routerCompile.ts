import { compile } from "path-to-regexp";

export const pathToUrl = <T extends object>(path: string, params: T) => {
  return compile(path)(params);
};
