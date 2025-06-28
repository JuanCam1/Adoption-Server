import capitalize from "capitalize";

export const capitalizeText = (text: string) => {
  return capitalize.words(text.toLowerCase());
};
