const toQueryString = (
  queryParams: Record<string, string | number | boolean>
) => {
  return new URLSearchParams(
    Object.entries(queryParams).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
};

export default toQueryString;
