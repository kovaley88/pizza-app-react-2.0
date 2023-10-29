import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);


  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];


  return (
    <div className="categories">
      <ul>
        {categories.map((valeu, i) => (<li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? "active" : ""}>{valeu}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
