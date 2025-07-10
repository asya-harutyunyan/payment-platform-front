export const fields = [
  {
    column: "name",
    valueKey: "user.name",
  },
  {
    column: "surname",
    valueKey: "user.surname",
  },
  {
    column: "email",
    valueKey: "user.email",
  },
  {
    column: "transaction_amount",
    currency: "wallet_deposit.order_currency",
    valueKey: "amount",
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
  // {
  //   column: "phone_number",
  //   valueKey: "user.bank_details.phone_number",
  // },
  {
    column: "status_by_client",
    valueKey: "status_by_client",
  },
];
