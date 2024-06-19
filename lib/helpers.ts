import { Currencies } from "./currencies";

export function DateUTCDate(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export function GetFormatterCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}
