// use to increase the count of amount and adding to cart
//custonm Input used
import { useState } from 'react'
import React, { useRef } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
  const [amountIsValid,setamountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) =>{
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().lenght === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setamountIsValid(false);
      return ;
    }
    props.onAddtoCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" 
            ref = {amountInputRef}
            input={{
            id: 'amount_' + props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please Enter a valid Amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm