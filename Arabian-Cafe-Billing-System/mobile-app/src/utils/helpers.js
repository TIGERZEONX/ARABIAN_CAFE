export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const truncateString = (str, num) => {
  if (!str) return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};
