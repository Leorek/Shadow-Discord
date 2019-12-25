export function isGif(file) {
  const gifValidator = new RegExp("(.*?).(gif)$");
  return gifValidator.exec(file);
}
