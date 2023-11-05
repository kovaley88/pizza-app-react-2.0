import React from 'react'
import styles from './search.module.scss'
import searchImg from '../../assets/img/search.svg'
import clearImg from '../../assets/img/clear.svg'
import { SearchContext } from '../../App'



function Search() {
    const { searchValue, setSearchValue } = React.useContext(SearchContext)

    return (
        <div className={styles.root}>
            <img className={styles.icon} src={searchImg} alt="search" />
            <input value={searchValue} onChange={event => setSearchValue(event.target.value)}
                className={styles.input} placeholder='Поиск пиццы...'></input>
            {searchValue && (
                <img onClick={() => setSearchValue('')}
                    className={styles.clear}
                    src={clearImg}
                    alt="stop" />)}

        </div>
    )
}

export default Search;