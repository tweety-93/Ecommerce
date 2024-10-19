import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, savedProducts } from "../store/SaveSlice";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  const saveItems = useSelector(savedProducts);
  const categoryFilter = useSelector((state) => state.auth.filterCategory);
  const searchFilter = useSelector((state) => state.auth.search);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      setProducts(response.data.products);
      setLoading(false); 
    };
    fetchData();
  }, []);

  const addHandler = (product) => {
    if (isAuthenticated) {
      dispatch(addToCart(product));
    } else {
      setPopup(true);
    }
  };

  const saveHandler = (product) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(product));
    } else {
      setPopup(true);
    }
  };

  const isProductSaved = (productId) => {
    return saveItems.some((item) => item.id === productId);
  };

 const filterByCategory = (product) => {
    return categoryFilter === "All" || product.category === categoryFilter;
  };

  const filterBySearch = (product) => {
    return product.title
      .toLowerCase()
      .includes(searchFilter.trim().toLowerCase());
  };

  const filterProducts = products.filter(
    (product) => filterByCategory(product) && filterBySearch(product)
  );

  return (
    <div className="container">
      <div className="mt-4 row row-cols-1 row-cols-md-4 g-5">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filterProducts.length === 0 ? (
        <p className="text-center">No products found.</p>
        ) : (
          filterProducts.map((product) => (
            <div className="col-4" key={product.id}>
              <div className="card">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    width="100%"
                    height="225"
                    alt={product.title}
                  />
                </Link>
                <div className="card-body">
                  <p className="card-title">{product.title}</p>
                  <h5 className="card-text">₹{product.price}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => addHandler(product)}
                  >
                    Add to cart
                  </button>
                  <button
                    className={`btn ms-4 ${
                      isProductSaved(product.id) ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => saveHandler(product)}
                  >
                    {isProductSaved(product.id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {popup && (
        <div className="popup">
          <div className="popup-content">
            <p>Please login to add products to your cart.</p>
            <button
              className="btn btn-danger ms-3"
              onClick={() => setPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
