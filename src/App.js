import './App.css';
import './scss/app.scss';
import React from 'react';
import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';


function App() {
  let [items, setItems] = React.useState([])


  React.useEffect(() => {
    fetch('https://652e77220b8d8ddac0b16cfd.mockapi.io/items')
      .then((res) => {
        return res.json()
      }).then((arr) => {
        setItems(arr)
      })
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => (<Skeleton key={obj.id} {...obj} />))
            }

          </div>
        </div>
      </div>
    </div>

  )
}

export default App;
