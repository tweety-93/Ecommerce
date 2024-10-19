import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/SaveSlice";
import { addToCart } from "../store/CartSlice";

function Saved() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.save.items);

  const removeHandler = (id) => {
    dispatch(remove(id));
  };

  const addHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container">
      <h3 className="mt-4 text-danger">My Whishlist</h3>

       {wishlist.length>0 ?(

      <div className="row row-cols-1 row-cols-md-4 g-5 mt-4">
        {wishlist.map((product) => (
          <div className="col-4" key={product.id}>
            <div className="card">
              <img
                src={product.thumbnail}
                alt=""
                className="card-img-top"
                width="100%"
                height="225"
              />
              <div className="card-body">
                <p className="card-title">{product.title}</p>
                <h5 className="card-text">{product.price}</h5>
                <button className="btn btn-primary" onClick={() => addHandler(product)}>
                  Add to cart
                </button>
            <button className="btn btn-danger ms-4" onClick={() => removeHandler(product.id)}> 
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>):(
        <div>
          <h5>your list is empty......add your loved products🙂</h5>
        </div>)}
    </div>
  );
}

export default Saved;