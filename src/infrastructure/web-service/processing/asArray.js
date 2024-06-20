export const asArray = (obj) => {
  if (!obj) return [];

  if (Array.isArray(obj)) return obj;

  return [obj];
};
