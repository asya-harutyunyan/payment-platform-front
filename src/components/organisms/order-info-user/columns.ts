export const fields = [
  {
    column: "transaction_amount",
    currency: "wallet_deposit.order_currency",
    valueKey: "amount",
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
    column: "status_by_client",
    valueKey: "status_by_client",
  },
];
