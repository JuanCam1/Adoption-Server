

export const randomOTP = (size: number) => {
  const numbers = "0123456789";

  let result = "";
  for (let i = 0; i < size; i++) {
    result += numbers[Math.floor(Math.random() * 10)];
  }
  return result;

}