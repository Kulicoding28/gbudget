export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Pound Sterling", locale: "en-GB" },
  { value: "IDR", label: "Rp Rupiah", locale: "id-ID" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
];

export type Currency = (typeof Currencies)[0];
