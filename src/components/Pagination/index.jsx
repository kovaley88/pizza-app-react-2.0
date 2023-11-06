import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss'


function Pagination({ currentPage, onChangePage }) {
    return (
        <div>
            <ReactPaginate className={styles.root}
                breakLabel="..."
                nextLabel=" >"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
                previousLabel="<"
            />

        </div>
    )
}

export default Pagination