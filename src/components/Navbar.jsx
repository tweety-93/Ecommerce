import React,{useState,useEffect} from 'react'
import {Link,useLocation} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import FilterList from './FilterList';
import { searchProduct,clearData,resetFilters } from "../store/AuthSlice";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";


function Navbar() {
  const [search,setSearch] = useState("")
  const items=useSelector((state)=> state.cart.totalQuantity)
  const list=useSelector((state)=> state.save.totalCount)
  const isAuth=useSelector((state)=> state.auth.isAuthenticated)
  const user=useSelector((state)=>state.auth.user?.email)
  const location=useLocation()
  
 const dispatch=useDispatch()
  useEffect(() => {
   setSearch("");
    dispatch(resetFilters()); 
  }, [location, dispatch]);


  const logoutHandler=()=>{
      dispatch(clearData())
    
  }
 const searchHandler=(e)=>{
  e.preventDefault()
    dispatch(searchProduct(search))
    //setSearch("")
}
return (
  <div>
    <header className="p-2 text-bg-dark">
      <div className="container">
        <div className="flex-wrap d-flex align-items-center justify-content-center justify-content-sm-start">
          <Link to="/" className="text-decoration-none">
            <h2 className="text-warning text-decoration-none">Shopstore</h2>
          </Link>
          <ul className="mb-2 nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0 ms-5">
            <li>
              <Link to="/saved" className="px-2 text-white nav-link">
                <button className="btn btn-outline-warning">
                  wishlist:{list}
                </button>
              </Link>
            </li>
          </ul>

          <div>
            <form className="d-flex" onSubmit={searchHandler}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
            </form>
            </div>
           <FilterList />
            <div>
            {isAuth ? (
              <>
                <h5>Hi {user}</h5>
                <button onClick={logoutHandler} className="btn btn-warning">
                  logout
                </button>
                <Link to="/cart">
                  <button className="btn btn-warning ms-2">
                    <FaShoppingCart/><span>:{items}</span>
                  </button>
                  
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button type="button" className="btn btn-warning me-2">
                    <FaUserPlus/>
                  </button>
                </Link>
                <Link to="/cart">
                  <button className="btn btn-warning ms-2">
                    <FaShoppingCart/><span>:{items}</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  </div>
);
}
export default Navbar

   