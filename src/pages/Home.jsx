import React from 'react'
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';


function Home() {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort.sortProperty)
    console.log('reduseCtate', categoryId)
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    };

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';


        fetch(`https://652e77220b8d8ddac0b16cfd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                return res.json()
            }).then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage])

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
                <Pagination onChangePage={(number) => setCurrentPage(number)} />
            </div>
        </>
    )
}

export default Home