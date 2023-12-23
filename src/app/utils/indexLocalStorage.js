const saveLocalStorage = (id, value) => {
  sessionStorage.setItem(id, JSON.stringify(value));
};

const getLocalStorage = (id) => {
  return JSON.parse(sessionStorage.getItem(id));
};

export { saveLocalStorage, getLocalStorage };
