export function isGif(file) {
  const gifValidator = new RegExp("(.*?).(gif)$");
  console.log("Is gif: " + gifValidator.test(file));
  return gifValidator.exec(file);
}
