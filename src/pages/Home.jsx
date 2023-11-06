import React from 'react'
import axios from 'axios'
import qs from 'qs'
import Categories from "../components/Categories"
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Sort, { list } from '../components/Sort';


function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = React.useCallback((idx) => {
        dispatch(setCategoryId(idx))
    }, []);

    // const onChangeCategory = (id) => {
    //     dispatch(setCategoryId(id))
    // };

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    const fetchPizzas = () => {
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
    }

    // Если изменили параменты и был первый рендер 
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty, categoryId, currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;

    }, [categoryId, sort.sortProperty, currentPage])
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе 
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы 
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])




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