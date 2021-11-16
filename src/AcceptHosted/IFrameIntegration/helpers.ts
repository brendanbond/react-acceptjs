export const parseQueryString = (queryString: string) => {
  const arr = queryString.split('&');
  return arr.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });
};
