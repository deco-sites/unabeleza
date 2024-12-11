import { JSX } from "preact";

export type Property = {
  [key: string]: string | JSX.ElementType;
};