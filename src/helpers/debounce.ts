/// a simple debounce, I prefer using other libs but minimal
let timer: number | null = null;
// eslint-disable-next-line
export function debounce(func: () => void, time: number) {
  if (timer) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, time);
  } else {
    timer = setTimeout(() => {
      func();
    }, time);
  }
}
