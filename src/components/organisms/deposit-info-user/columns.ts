export const fields = [
  {
    column: "processing_amount",
    valueKey: "amount",
  },
  {
    column: "profit_2",
    valueKey: "profit",
  },
  {
    column: "left_amount",
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
  {
    column: "phone_number",
    valueKey: "payment_method.phone_number",
  },
  {
    column: "final_status",
    valueKey: "final_status",
  },
];
