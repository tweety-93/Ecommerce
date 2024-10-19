import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/AuthSlice'

function Login() {
const navigate=useNavigate()
const [input,setInput]=useState({email:"",password:""})
const dispatch = useDispatch()

const loginHandler=(e)=>{
e.preventDefault()
if(input.email==="" || input.password===""){
  alert("please fill correct details...")
}else{dispatch(login(input));
setInput({ email: "", password: "" });
navigate("/");}

}

const handleChange=(e)=>{
  const {name,value}=e.target
  setInput(()=>{
    return {...input,[name]:value}
  })
}

  return (
    <div className="container mt-4">
      <h3 className="text-danger">Login</h3>
      <form onSubmit={loginHandler}>
        <div className="mb-3 col-lg-6">
          <label htmlFor="text" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-lg-6">
          <label htmlFor="text" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      
    </div>
  );
}

export default Login;