export function getLocalStorageInstance() {
  const checkStorageAvailability = () => {
    try {
      return Boolean(window.localStorage);
    } catch {
      return false;
    }
  };

  if (checkStorageAvailability()) {
    return window.localStorage;
  }

  console.warn('Cannot find localStorage, features that depend on it will not work!');
  return undefined;
}
