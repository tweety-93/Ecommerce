import React from 'react'
import { setFilterCategory } from "../store/AuthSlice";
import { useDispatch,useSelector } from 'react-redux';

function FilterList() {
  const selectedCategory =useSelector((state)=>state.auth.filterCategory)
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => { dispatch(setFilterCategory(category));
  }
 return (
   <div>
     <select
       className="btn btn-outline-light me-5"
       onChange={(e) => handleCategoryChange(e.target.value)}
       value={selectedCategory}
     >
       <option value="All">All categories</option>
       <option value="laptops">Laptops</option>
       <option value="beauty">Beauty</option>
       <option value="groceries">groceries</option>
       <option value="fragrances">Fragrances</option>
       <option value="home-decoration">Home decore</option>
       <option value="furniture">Furniture</option>
       <option value="mens-shirts">Mens-shirts</option>
       <option value="mens-shoes">Mens-shoes</option>
       <option value="mens-watches">Mens-watches</option>
       <option value="mobile-accessories">Mobile-accessories</option>
       <option value="kitchen-accessories">kitchen-accessories</option>

       <option></option>
     </select>
   </div>
 );
}

export default FilterList