export const replaceUnderscores = (str: string) => {
  return str.replace(/_/g, ' ');
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
