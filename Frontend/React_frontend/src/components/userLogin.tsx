import {useState } from "react";
import { Navigate } from "react-router-dom";
import { makeLogin } from "../services/makeLogin";
import { mainPageUrl } from "../globalVariables/globalVariables";
import '../styles/registerUser.css'

export const UserLogin = () =>   {
  const [newUserData, setnewUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setnewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

 async function handleSubmit(e: any, postBody: any){
    e.preventDefault()
    const response = await makeLogin(postBody);
    if(response.data.auth === true){
      alert("Login realizado com sucesso!")
      console.log(response.data)
      //Redirecionar a pagina
      window.location.href = mainPageUrl
      // return(<Navigate to={mainPageUrl} replace={true}/>)
      // window.location.reload()
    }
    else{
      alert(response.data.message)
    }
  };

  return (
      <div className="register_popup">
            <div className="register_title">
              LOGIN
            </div>
          <form className="register_form" onSubmit={(e) => handleSubmit(e, newUserData)}>
            <input type="hidden" name="remember" value="true" />
            <div className="register_inputs">
              <div className="register_input_wrapper">
                <label htmlFor="email-address" className="sr-only">
                  Email: 
                </label>
                <input
                  className="register_input"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={newUserData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="register_input_wrapper">
                <label htmlFor="password" className="sr-only">
                  Senha: 
                </label>
                <input
                  className="register_input"
                  name="password"
                  required
                  type="password"
                  autoComplete="current-password"
                  placeholder="Senha"
                  value={newUserData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="register_button"
              >
                Login
              </button>
            </div>
          </form>
      </div>
  );
};
