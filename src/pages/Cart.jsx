import React from 'react'
import EmptyCart from '../assets/img/empty-cart.png'





function Cart() {
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: "#fe5f1e", fontSize: '100px', marginBottom: '50px' }}> Cart </h1>
            <img style={{ paddingLeft: "27%" }} src={EmptyCart} alt="Oh, no!" />
        </div>
    )
}

export default Cart
