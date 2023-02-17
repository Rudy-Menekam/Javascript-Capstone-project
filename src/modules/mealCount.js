const mealCount = (section, temp) => {
  const items = Array.from(section.children);
  temp.textContent = items.length;
  return items;
};

export default mealCount;