//set data to local storage
export const setToLocalStorage = (key: string, value: any) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  return localStorage.setItem(key, value);
};

//get data from local storage
export const getFromLocalStorage = (key: string) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  return localStorage.getItem(key);
};

//delete from local storage
export const deleteFromLocalStorage = (key: string) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  return localStorage.removeItem(key);
};

//is login user
export const isLoginUser = () => {
  const authToken = getFromLocalStorage("dentistAuthToken");
  return !!authToken;
};
