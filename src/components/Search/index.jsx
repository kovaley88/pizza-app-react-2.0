import React from 'react'
import styles from './search.module.scss'
import searchImg from '../../assets/img/search.svg'
import clearImg from '../../assets/img/clear.svg'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'


function Search() {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef()

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000),
        []
    )

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <img className={styles.icon} src={searchImg} alt="search" />
            <input ref={inputRef} value={value} onChange={onChangeInput}
                className={styles.input} placeholder='Поиск пиццы...'></input>
            {value && (
                <img onClick={onClickClear}
                    className={styles.clear}
                    src={clearImg}
                    alt="stop" />)}

        </div>
    )
}

export default Search;