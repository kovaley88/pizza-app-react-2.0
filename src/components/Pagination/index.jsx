import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss'


function Pagination({ onChangePage }) {
    return (
        <div>
            <ReactPaginate className={styles.root}
                breakLabel="..."
                nextLabel=" >"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                renderOnZeroPageCount={null}
                previousLabel="<"
            />

        </div>
    )
}

export default Pagination