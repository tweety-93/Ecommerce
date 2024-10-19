import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ProductItem() {
  const {id}=useParams();
  const [item,setItem]=useState("")
  const dispatch=useDispatch()

  useEffect(()=>{
    const fetchProduct =async()=>{
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setItem(res.data)
    }
    fetchProduct()
  },[id])

  const addHandler = () => {
    dispatch(addToCart(item));
  };

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} size={20} color="#ffc107" />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" size={20} color="#ffc107" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} size={20} color="#e4e5e9" />);
    }

    return stars;
  };

return (
   <div>
     {item && (
       <div className="mt-4 mb-3 card ms-5 me-5">
         <div className="row g-0">
           <div className="col-md-4">
             <img
               src={item.thumbnail}
               className="img-fluid rounded-start"
               width="100%"
               height="50%"
               alt="..."
             />
           </div>
           <div className="col-md-8">
             <div className="card-body">
               <h5 className="card-title">{item.title}</h5>
               <p className="card-text">{item.description}</p>
               <p className="card-text">
                 {renderStars(item.rating)}
                  <span style={{ marginLeft: '10px' }}>{item.rating}</span>
               </p>
               <button className="btn btn-primary" onClick={addHandler}>
                 Addtocart
               </button>
               
             </div>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}
export default ProductItem