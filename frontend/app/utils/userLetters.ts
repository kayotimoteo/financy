export const getUserLetters = (userName?: string) => {
  if (!userName) {
    return "";
  }

  return userName
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("");
};
