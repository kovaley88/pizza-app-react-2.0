import React from 'react'
import ImgNotFound from '../../assets/img/notFound.jpg'
import styles from './NotFoundBlock.module.scss'


console.log(styles)

function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1 style={{ color: "#fe5f1e", fontSize: '100px', marginBottom: '50px' }}> Not Found :( </h1 >
            <img className={styles.img__nf} src={ImgNotFound} alt="Oh, no!" />
        </div>
    )
}

export default NotFoundBlock 