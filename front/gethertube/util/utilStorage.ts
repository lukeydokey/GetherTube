"use client";
type TypeStorageKey = "user" | "accessToken";

export const utilStorage = () => {
  const getItem = (key: TypeStorageKey) => {
    if (typeof window === "undefined") return "";
    if (!localStorage.getItem(key)) return "";
    return JSON.parse(localStorage.getItem(key) || "");
  };

  const setItem = (key: TypeStorageKey, value: string | object) => {
    if (typeof window === "undefined") return "";
    if (typeof value === "string") localStorage.setItem(key, value);
    else localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteItem = (key: TypeStorageKey) => {
    if (typeof window === "undefined") return "";
    localStorage.removeItem(key);
  };

  return { getItem, setItem, deleteItem };
};
