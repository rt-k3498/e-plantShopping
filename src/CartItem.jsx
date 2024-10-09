import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = (props) => {
  const cart = useSelector(state => state.cart.items);
  const {onContinueShopping} = props
  const {cartItems} = props
  const {setCartItems} = props
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const costs=cart.map((items)=>{
        const item_cost= Number(items.cost.slice(1))
        var cost_curr=item_cost*items.quantity
        return cost_curr
    })
    var total_cost = 0
    for (let i of costs){
        total_cost+=i
    }
    return String(total_cost)

  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e)
  };

  const handleCheckoutShopping = (e) => {
    alert("functionality to be added for future reference")
  }

  const handleIncrement = (item) => {
    const new_quantity = item.quantity+1
    dispatch(updateQuantity({...item,quantity:new_quantity}))
  };

  const handleDecrement = (item) => {
    const new_quantity = item.quantity-1
    if (new_quantity <= 0){handleRemove(item)}
    else{dispatch(updateQuantity({...item,quantity:new_quantity}))}
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item))
    const name = item.name
    setCartItems((prev)=>({...prev,[name]:false}))

  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = Number(item.cost.slice(1))
    const total = cost * item.quantity
    return total

  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick = {(e)=>handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


