// export const formatBalance = (balance) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//     minimumFractionDigits: 2,
//     currencySign: "standard",
//   }).format(balance);

export const formatAmount = (amount) => {
  const absoluteValue = Math.abs(amount);
  const formatted = Number(absoluteValue).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted;
};

export const formatSortCode = (sortCode) => {
  return sortCode !== undefined
    ? sortCode.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3")
    : "";
};
