import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password , setPassword] = useState("");
    const [isLoginForm , setIsLoginForm] = useState(true)
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handlelogin = async () =>  {
        try {
            const res = await axios.post(BASE_URL+"/login",{
                emailId,
                password},
                {withCredentials: true});
                dispatch(addUser(res.data));
                return navigate("/")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }

    }


    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL+"/signup",
                {firstName,lastName,emailId,password},
                {withCredentials:true}

            )
            dispatch(addUser(res.data.data));
            return navigate("/profile")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
            
        }
    }

    return (
        <div className="flex justify-center my-10"> 
            <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm?"Login":"Sign Up"}</h2>
    <div>
     {!isLoginForm&&(
     <> 
     <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">First Name </span>
            </div>
            <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" placeholder="Type here" />

        </label>
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Last Name</span>
            </div>
            <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" placeholder="Type here" />

        </label>
        </>
              ) }
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Email ID </span>
            </div>
            <input value={emailId} onChange={(e)=> setEmailId(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" placeholder="Type here" />

        </label>
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Password</span>
            </div>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="input input-bordered w-full max-w-xs" placeholder="Type here" />

        </label>
    </div>
    <p className="text-red-500" >{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={isLoginForm?handlelogin:handleSignup}>
        {isLoginForm? "Login":"Sign Up"}
        </button>
    </div>
    <p className="m-auto cursor-pointer py-2" onClick={()=>setIsLoginForm((value) => !value)}>{isLoginForm
    ?"New user? SignUp here"
    :"Existing User ? Login here"}</p>
  </div>
</div>
        </div>
    )
};

export default Login;