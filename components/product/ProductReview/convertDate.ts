export default function convertDate(isoDate: string) {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);
  return formattedDate;
}
