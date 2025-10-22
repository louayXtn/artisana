import  { useState } from 'react'
import { useLoginMutation } from '../redux/features/auth/authApislice'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const [user_inputs, setUser_inputs] = useState({email:"", password:""})
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        email: user_inputs.email,
        password: user_inputs.password
      });
      const accessToken = data.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken);
      }
      setUser_inputs({ email: "", password: "" });
      navigate("/");
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
          <fieldset>
              <label htmlFor="email">email</label>
              <input id="email" type="email" name="email"required value={user_inputs.email} onChange={(e)=>setUser_inputs(prev=> {return{...prev,email:e.target.value}})} />
          </fieldset>
          <fieldset>
              <label htmlFor="password">password</label>
              <input id="password" type="password" name="password" required value={user_inputs.password} onChange={(e)=>setUser_inputs(prev=> {return{...prev,password:e.target.value}})}/>
          </fieldset>
          <button type="submit" disabled={isLoading}>{isLoading ? "submit..." : "login"}</button>
          {/* <button type="submit" >login</button> */}
      </form>
      {isError && <p>{error?.data?.message || "something went wrong"}</p>}
      {isSuccess && <p>Login successful!</p>}
    </div> 
  )
}

export default Login