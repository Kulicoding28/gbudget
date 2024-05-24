export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Pound Sterling", locale: "en-GB" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { valeu: "INA", label: "Rp Rupiah", locale: "id-ID" },
];

export type Currency = (typeof Currencies)[0];
