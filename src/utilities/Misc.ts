export const randomIntFromInterval = (min: any, max: any) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
