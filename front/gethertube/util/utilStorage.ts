type TypeStorageKey = "user" | "accessToken";

export const utilStorage = () => {
  const getItem = (key: TypeStorageKey) => {
    if (!localStorage.getItem(key)) return "";
    return JSON.parse(localStorage.getItem(key) || "");
  };

  const setItem = (key: TypeStorageKey, value: string | object) => {
    if (typeof value === "string") localStorage.setItem(key, value);
    else localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteItem = (key: TypeStorageKey) => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, deleteItem };
};
