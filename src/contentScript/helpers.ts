export function formatName(name) {
  const [lastName, firstName] = name.split(', ');
  if (firstName === undefined) return `${lastName}`;
  return `${firstName} ${lastName}`;
}
