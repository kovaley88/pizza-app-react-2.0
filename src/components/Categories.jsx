import React from "react";

function Categories({ valeu, onChangeCategory }) {

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
        {categories.map((catigoryName, i) => (<li key={i} onClick={() => onChangeCategory(i)} className={valeu === i ? "active" : ""}>{catigoryName}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
