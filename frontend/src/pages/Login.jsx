import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sing Up");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sing Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4  text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === "Login" ?
            <p onClick={() => setCurrentState('Sing Up')} className="cursor-pointer ">Create account</p> :
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer ">Login Here</p>
        }
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">{currentState === 'Login' ? 'Sing In' : 'Sing Up'}</button>
    </form>
  );
};

export default Login;



// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// const Login = () => {
//   const navigate = useNavigate();
// const { token, setToken, backendUrl } = useContext(ShopContext);

// const [email, setEmail] = useState("d@gmail.com");
// const [password, setPassword] = useState("123456789");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(backendUrl + "/api/user/login", {
//         email,
//         password,
//       });
//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         navigate("/login"); // Login qilingandan keyin dashboardga yo'naltirish
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/login"); // Agar token mavjud bo'lsa, dashboardga o'ting
//     }
//   }, [token, navigate]);

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl">Login</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />

//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         <p onClick={() => navigate("/register")} className="cursor-pointer">
//           Create an account
//         </p>
//       </div>

//       <button className="px-8 py-2 mt-4 font-light text-white bg-black">Sign In</button>
//       <ToastContainer />
//     </form>
//   );
// };

// export default Login;
