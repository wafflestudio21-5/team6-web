function snakeToCamel(str: string) {
  return str.replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
}

export function convertKeysToCamelCase(obj) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const camelKey = snakeToCamel(key);
      newObj[camelKey] =
        obj[key] && typeof obj[key] === "object"
          ? convertKeysToCamelCase(obj[key])
          : obj[key];
    });
    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }
  return obj;
}
