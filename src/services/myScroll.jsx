const myScroll = () => {
  return window.scrollTo({
    // top: document.documentElement.scrollHeight,
    top: 100,
    left: 100,
    behavior: "smooth",
  });
};
export default myScroll;
