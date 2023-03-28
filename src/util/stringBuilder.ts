/**
 * Returns a string containing all the elements of an array joined by spaces.
 *
 * @param {(string | null | undefined)[]} classNames The array containing the classnames.
 */
export function classNameBuilder(classNames: (string | null | undefined)[]): string {
  return (classNames.join(" ") ?? "").trim().replace(/ {2,}/g, " ");
}