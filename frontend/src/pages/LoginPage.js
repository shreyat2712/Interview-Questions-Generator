import React, { useState } from "react";
import "./LoginPage.css";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const LoginPage = () => {

  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();
  const dispatch=useDispatch();
  const navigateSignup = () => {
    navigate("/signup");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
     e.preventDefault();
     setLoading(true);
     if (!email || !password) {
       console.log("email or password missing");
      setLoading(false);
      return;
    }
    
    try {
      // console.log("trying");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/login", { email, password }, config);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", true);
      setLoading(false);
      navigate("/");
      // console.log(data);
      dispatch(authActions.login({isLoggedIn:true}))
      // dispatch(authActions.login())
    } catch (error) {
      setLoading(false);
    }
  };
  const submitForgot=()=>{
    navigate("/forgotpass")
  }
  return (
    <div className="h_darkBG">
      <div className="h_centered">
        <div className="h_outer_div">
          <div className="h_container">
            <div className="h_topic">Login</div>
            {/* <button className="h_cross" onClick={() => setIsOpen(false)}> */}
              {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
            {/* </button> */}
            <form>
              <label className="h_label">Email:</label>
              <br />
              <input
                className="h_input"
                placeholder="abc@gmail.com"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="h_label" value={password}>
                Password
              </label>
              <br />
              <div className="h_password h_input">
                <input
                  className="h_input_password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon
                  className="h_icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="h_forgotpass" onClick={submitForgot}>Forgot Password?</div>
              <br />
              <div className="h_button_div">
                <Button
                  className="h_button"
                  type="submit"
                  value="Login"
                  onClick={submitHandler}
                  isLoading={loading}
                >
                  Login
                </Button>
              </div>
              <div className="h_signup">
                Don't have an account?{" "}
                <span className="h_signup_link" onClick={navigateSignup}>
                  SignUp
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
