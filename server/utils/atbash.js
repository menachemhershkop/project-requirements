export default function atbash(text) {
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const reversed = "zyxwvutsrqponmlkjihgfedcba";

  return text
    .toLowerCase()
    .split("")
    .map(char => {
      const index = abc.indexOf(char);
      return index !== -1 ? reversed[index] : char;
    })
    .join("");
}
