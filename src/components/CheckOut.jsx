import React,{useState} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {useSelector} from "react-redux"

function CheckOut() {
 const [input,setInput]=useState({name:"",address:"",city:"",country:"",zip:""})
 const cartItems=useSelector((state)=>state.cart.items)
 const totalAmount=useSelector((state)=>state.cart.totalPrice)

 const handleChange=(e)=>{
  const {id,value} = e.target
  setInput((prevData)=>{
    return{...prevData,[id]:value}
  })

 }
 const makePayment=async(e)=>{
  e.preventDefault()
  const stripe = await loadStripe(
    "pk_test_51NdQMoSGvhaHUVO2Sx3K1aLXMdLe9cDh0U9vwsE4WYijnGwxykrisHiTZcctJWFmWXOtbQBTgkt7u4lDLQ436XEk00WP6KAGif"
  );
  const body={
    products:cartItems,
    amount:totalAmount *100,
    customer: {
        name:input.name,
        address: {
          line1: input.address,
          city: input.city,
          postal_code: input.zip,
          country: "IN",
        },
      },
  }
  const headers={
    "Content-Type":"application/json"
   }
  const response = await fetch("http://localhost:4000/api/create-checkout-sessions",{
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });
    const session=await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.log(result.error);
      }
 }
return (
    <div className='container mt-4'>
     <form className="row g-3" onSubmit={makePayment}>
  <div className="col-md-6">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={handleChange} value={input.name}/>
  </div>
 
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" onChange={handleChange} value={input.address}/>
  </div>
  
  <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" id="city" onChange={handleChange} value={input.city}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Country</label>
    <select id="country" className="form-select" onChange={handleChange} value={input.country}>
      <option>Select...</option>
      <option>india</option>
    </select>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="zip" onChange={handleChange} value={input.zip}/>
  </div>
 
  <div className="col-12">
    <button type="submit" className="btn btn-primary" >submit</button>
  </div>
</form>
     </div>
  )
}
export default CheckOut


 