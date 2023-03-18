// it will be available to all the chidren components with out using props chain
import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    // //in this place, we generate a new array,
    // //if the action.item already exist in the state.items array
    // //then it generates a new array without that action.item
    // const mergedItems = state.items.filter(item =>{
    //     return action.item.id !== item.id
    // });
    // //Here we concat the mergedItems array with the action.item object
    // //therefore the final result is an array without repeated objects
    // const updatedItems = mergedItems.concat(action.item);
    // //Here we calculate the totala amount using a reduce method for add
    // //in a prevValue the operation (item.amount * item.price)
    // const updateTotalAmount = updatedItems.reduce((prevValue, item) =>{
    //     return prevValue + (item.amount * item.price);
    // }, 0);
    // // console.log(updatedItems, updateTotalAmount)
    // return{
    //     items: updatedItems,
    //     totalAmount: updateTotalAmount
    // };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'CLEAR'){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: "ADD", item: item});
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id: id});
  };

  const clearCartHandler = () => {
    dispatchCartAction({type:'CLEAR'});
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
