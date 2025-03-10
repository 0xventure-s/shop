export const currencyFormat = (value: number) => {
  return (
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value)
  );
};
