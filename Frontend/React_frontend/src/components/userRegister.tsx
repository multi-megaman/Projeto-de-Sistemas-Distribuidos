import {useState } from "react";

import { RegisterNewUser } from "../services/registerNewUser";

import '../styles/registerUser.css'

export const UserRegister = () =>   {
  const [newUserData, setnewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setnewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

 async function handleSubmit(e: any, postBody: any){
    e.preventDefault()
    RegisterNewUser(postBody)
  };

  return (
      <div className="register_popup">
            <div className="register_title">
              CADASTRO
            </div>
          <form className="register_form" onSubmit={() => handleSubmit(event, newUserData)} id="submitRegister">
            <input type="hidden" name="remember" value="true" />
            <div className="register_inputs">
              <div className="register_input_wrapper">
                <label htmlFor="name" className="sr-only">
                  Nickcname: 
                </label>
                <input
                  id="name"
                  className="register_input"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="Nome"
                  value={newUserData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="register_input_wrapper">
                <label htmlFor="email-address" className="sr-only">
                  Email: 
                </label>
                <input
                  id="email-address"
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
                  id="password"
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
                Cadastrar
              </button>
            </div>
          </form>
      </div>
  );
};
