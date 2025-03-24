export const fields = [
  {
    column: "name",
    valueKey: "name",
  },
  {
    column: "surname",
    valueKey: "surname",
  },
  {
    column: "email",
    valueKey: "email",
  },
  {
    column: "bank_name",
    label: "payment_details",
    valueKey: "bank_details.bank_name",
  },
  {
    column: "card_holder",
    valueKey: "bank_details.card_holder",
  },
  {
    column: "card_number",
    valueKey: "bank_details.card_number",
  },
  {
    column: "currency",
    valueKey: "bank_details.currency",
  },
  // {
  //   column: "phone_number",
  //   valueKey: "bank_details.phone_number",
  // },
];
