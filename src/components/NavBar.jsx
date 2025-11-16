import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState, useEffect } from "react";

const NavBar = () =>{
 const  user = useSelector((store)=> store.user);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [theme, setTheme] = useState(() => {
   // Get theme from localStorage or default to 'dark'
   return localStorage.getItem('theme') || 'dark';
 });

 useEffect(() => {
   // Apply theme to HTML element
   document.documentElement.setAttribute('data-theme', theme);
   localStorage.setItem('theme', theme);
 }, [theme]);

 const toggleTheme = () => {
   setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
 };

 const handleLogout = async  ()=>{
  try {
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
    dispatch(removeUser());
    navigate("/login");
    
  } catch (err) {
    
  }

 }




    return (
            <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2 items-center">
    <button className="btn btn-ghost btn-circle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
 { user &&( <div className="flex gap-2">Welcome, {user.firstName}
  <div className="dropdown dropdown-end mx-5 flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to= "/connections">Connections</Link></li>
        <li><Link to= "/requests"> Requests</Link></li>

        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
  </div>
</div>
        
    )
}

export default NavBar;