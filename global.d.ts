// prettier-ignore
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IntlMessages extends Messages {}
}
