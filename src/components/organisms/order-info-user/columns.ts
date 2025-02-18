export const fields = [
  {
    column: "transaction_amount",
    valueKey: "trans_amount",
  },
  {
    column: "bank_name",
    label: "payment_details",
    valueKey: "user.bank_details.bank_name",
  },
  {
    column: "card_holder",
    valueKey: "user.bank_details.card_holder",
  },
  {
    column: "card_number",
    valueKey: "user.bank_details.card_number",
  },
  {
    column: "currency",
    valueKey: "user.bank_details.currency",
  },
  {
    column: "phone_number",
    valueKey: "user.bank_details.phone_number",
  },
  {
    column: "final_status",
    valueKey: "final_status",
  },
];
