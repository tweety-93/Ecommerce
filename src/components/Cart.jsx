import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem, removeFromCart } from "../store/CartSlice";
import { TiDelete } from "react-icons/ti";
import {Link} from"react-router-dom"


function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  const handleIncrement = (productId) => {
    dispatch(increaseItem(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decreaseItem(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

return (
    <div className="container">
      <h4>Your Shopping Cart</h4>
      <div className="row">
        {cartItems.map((product) => (
          <div key={product.id} className="mb-2 card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.thumbnail}
                  className="img-fluid rounded-start"
                  alt={product.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <p className="card-text">Price:₹{(product.price)*(product.quantity).toFixed(2)}</p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleDecrement(product.id)}> - </button>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleIncrement(product.id)}> +</button>
                    <button className="btn btn-danger"
                       onClick={() => handleRemove(product.id)}>
                        <TiDelete/>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h5>Total Amount: ₹{totalAmount.toFixed(2)}</h5>
      <Link to="/Checkout">
      <button className="btn btn-success">Proceed to Pay</button></Link>
    </div>
  );
}
export default Cart;
