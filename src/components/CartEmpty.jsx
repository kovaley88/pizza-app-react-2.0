import React from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
    return (
        <div>
            <div class="cart cart--empty">
                <h2 style={{ color: "#fe5f1e", fontSize: '50px' }}>
                    Cart is empty! <icon>😕</icon></h2>
                <img src={cartEmptyImg} alt="Empty cart" />
                <Link to="/" class="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </div>
    )
}

export default CartEmpty