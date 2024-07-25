export const decoderString = (string) => {
  const decodedString = string;
  const parser = new DOMParser();
  const decodedElement = parser.parseFromString(decodedString, "text/html");
  const decodedSentence = decodedElement.documentElement.textContent;
  return decodedSentence
}