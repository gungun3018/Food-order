// Stylish button for Cart
import CartIcon from '../Cart/CartIcon'
import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'
const HeaderCartButton = (props) => {
  const [btnisHighlighted,setbtnisHighlighted] =  useState(false);
  
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const numberOfCartItems = items.reduce((curNumber,item) => {
    return curNumber + item.amount;
  },0);
  // reduce method - take 2 arguements, transform array of data into a single value,
  //first arguemnet is a function ,second arguemenet is starting value, the function the receives 2 arguements
  //  curNumber and item, after running of it it will change and change to currNumber + item.amount
  
  const btnClasses = `${classes.button} ${btnisHighlighted ?  classes.bump : ''}`
  useEffect(() => {
    if(cartCtx.items.length === 0) return;
    setbtnisHighlighted(true);
    const timer = setTimeout(() => {
      setbtnisHighlighted(false);
    },300);

    return () => {
      clearTimeout(timer); // clean up 
    };

  },[items]);
  return (
    <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
  )
}

export default HeaderCartButton