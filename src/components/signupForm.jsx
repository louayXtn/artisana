import { useState } from "react"
import { useRegisterMutation } from "../redux/features/auth/authApiSlice"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
const SignupForm = () => {
    const navigate = useNavigate();
    const [user_inputs,setUser_inputs]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    })
    const [register,{isLoading,isSuccess,isError,error}]=useRegisterMutation();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await register({
                first_name:user_inputs.first_name,
                last_name:user_inputs.last_name,
                email:user_inputs.email,
                password:user_inputs.password
            });
            
            const accessToken=data.accessToken;
            if(accessToken)
                {Cookies.set("accessToken",accessToken);}
            setUser_inputs({
                first_name:"",
                last_name:"",
                email:"",
                password:""
            })
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }
  return (
    <div className="signup-form">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="first_name">first name</label>
                <input id="first_name" type="text" name="first_name"required minLength={5} value={user_inputs.first_name} onChange={(e)=>setUser_inputs(prev=>{return{...prev,first_name:e.target.value}})}/>
            </fieldset>
            <fieldset>
                <label htmlFor="last_name">last name</label>
                <input id="last_name" type="text" name="last_name"required minLength={5} value={user_inputs.last_name} onChange={(e)=>setUser_inputs(prev=> {return{...prev,last_name:e.target.value}})}/>
            </fieldset>
            <fieldset>
                <label htmlFor="email">email</label>
                <input id="email" type="email" name="email"required value={user_inputs.email} onChange={(e)=>setUser_inputs(prev=> {return{...prev,email:e.target.value}})}/>
            </fieldset>
            <fieldset>
                <label htmlFor="password">password</label>
                <input id="password" type="password" name="password" required minLength={8} value={user_inputs.password} onChange={(e)=>setUser_inputs(prev=> {return{...prev,password:e.target.value}})}/>
            </fieldset>
            <button type="submit" disabled={isLoading}>{isLoading ? "submitting" : "create Account" }</button>
        </form>
        {isError && <p>{error?.data?.message || "something went wrong"}</p>}
        {isSuccess && <p>Registration successful!</p>}
        
    </div>
  )
}

export default SignupForm