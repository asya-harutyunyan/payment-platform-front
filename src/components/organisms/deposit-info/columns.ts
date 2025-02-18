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
    column: "processing_amount",
    valueKey: "processing_amount",
  },
  {
    column: "profit",
    valueKey: "profit",
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
    valueKey: "payment_method..card_number",
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
    label: "",
    valueKey: "final_status",
  },
  {
    column: "processing_amount",
    valueKey: "processing_amount",
  },
];
