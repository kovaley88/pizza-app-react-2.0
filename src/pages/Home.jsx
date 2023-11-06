import React from 'react'
import axios from 'axios'
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';


function Home() {
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // запрос на backend через fetch
        // fetch(`https://652e77220b8d8ddac0b16cfd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then((res) => {
        //         return res.json()
        //     }).then((arr) => {
        //         setItems(arr)
        //         setIsLoading(false)
        //     })

        axios.get(`https://652e77220b8d8ddac0b16cfd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => {
                setItems(response.data);
                setIsLoading(false);
            })

        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    // Вариант поиска пицц подходит для небольшого количества 
    // const pizzas = items.filter((obj) => {
    //     if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false;
    // })
    //     .map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    const skeletons = [... new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <>

            <div className='container'>
                <div className="content__top">
                    <Categories valeu={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading ? skeletons : pizzas}
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    )
}

export default Home