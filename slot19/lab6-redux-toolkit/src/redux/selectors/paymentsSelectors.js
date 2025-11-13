export const selectSuccessfulPayments = (state) =>
  state.payments.list.filter((p) => p.status === "SUCCESS");
