export const fields = [
  {
    column: "processing_amount",
    currency: "deposit_currency",
    valueKey: "amount",
  },
  {
    column: "profit_2",
    currency: "order_currency",
    valueKey: "profit",
  },
  {
    column: "final_status_deposit",
    valueKey: "status_by_admin",
  },
  {
    column: "left_amount",
    currency: "order_currency",
    valueKey: "processing_amount",
  },
  {
    column: "bank_name",
    label: "payment_details",
    valueKey: "payment_method.bank_name",
  },
  {
    column: "card_holder",
    valueKey: "payment_method.card_holder",
  },
  {
    column: "card_number",
    valueKey: "payment_method.card_number",
  },
  {
    column: "currency",
    valueKey: "payment_method.currency",
  },
  // {
  //   column: "phone_number",
  //   valueKey: "payment_method.phone_number",
  // },
];
