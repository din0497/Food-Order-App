import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout.";

const Cart = (props) => {
  const [isShown, setIsShown] = useState(false);
  const ctx = useContext(CartContext);
  const hasItems = ctx.items.length === 0;

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const showHandler = () => {
    setIsShown(!isShown);
  };

  const submitOrderHandler = async (userData) => {
   await fetch("https://react-http-fe8b0-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: ctx.items
      })
    });
  };

  console.log(ctx.items);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          name={item.name}
          onRemove={cartItemRemoveHandler(null, item.bind)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${ctx.totalAmount.toFixed(2)}`}</span>
      </div>
      {!isShown && (
        <div className={classes.actions}>
          <button onClick={props.onClick} className={classes["button--alt"]}>
            Close
          </button>
          {!hasItems && (
            <button onClick={showHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
      {isShown && (
        <Checkout onConfirm={submitOrderHandler} onCancel={showHandler} />
      )}
    </Modal>
  );
};

export default Cart;
