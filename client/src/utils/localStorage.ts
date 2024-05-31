export const getDataFromLocalStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

export const setDataToLocalStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
