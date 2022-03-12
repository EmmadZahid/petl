const LocalStorageService = {
  getItem: key => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return null
    }
  },
  setItem: (key,value) => {
    try {
      return localStorage.setItem(key,JSON.stringify(value));
    } catch (error) {
        return null
    }
  },
  removeItem: (key,value) => {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
        return null
    }
  }
};

export default LocalStorageService;
