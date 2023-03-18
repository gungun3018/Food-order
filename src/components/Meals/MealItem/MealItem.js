import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const cost = `₹${props.cost.toFixed(2)}`;

  const addToCardHandler = (amount) =>{
    cartCtx.addItem({
      id:props.id,
      name:props.title,
      amount: amount,
      price:props.cost
    });
  }

  return (
      <li className={classes.meal} id={props.id}>
        <div>
          <h3>{props.title}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{cost}</div>
        </div>
        <div>
          <MealItemForm onAddtoCart={addToCardHandler} id={props.id}></MealItemForm>
        </div>
      </li>
  );
};

export default MealItem;
