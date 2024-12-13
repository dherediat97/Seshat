export default function debounce(func: any, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: []) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
