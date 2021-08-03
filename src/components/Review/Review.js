import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif';
// import happyImage from '../../images/';


const Review = () => {
    const [cart,setCart] = useState([]);
    // const [orderPlaced,setOrderPlaced] = useEffect(false);
    // const [orderPlaced,setOrderPlaced] = useEffect(false);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const handlePlaceOrder = ()=>{
        setCart([]); 
        setOrderPlaced(true);
        processOrder();
        
    }
    const removeProduct = (productKey)=>{
        console.log('remove clicked',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);
    },[]);
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
    }

    return (
        <div className="twin-container">
            
            <div className="product-container">
            {
                cart.map(pd=><ReviewItems
                    key={pd.key}
                    removeProduct ={removeProduct}
                    product={pd}></ReviewItems>)
            }
            {
                thankYou
            }
            </div>
            <div className="car-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;