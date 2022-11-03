const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };

  return debounced;
};

export default debounce;
