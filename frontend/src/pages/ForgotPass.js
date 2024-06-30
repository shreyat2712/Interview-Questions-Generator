import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const ForgotPass = () => {
    
  const [email, setEmail] = useState();
  const [newpassword, setNewpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newconfirmpassword, setNewconfirmpassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !newpassword || !newconfirmpassword) {
      console.log("enter all fields");
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (newpassword !== newconfirmpassword) {
      console.log("password donot match");
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      console.log("trying");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/forgetPassword",
        { email, newpassword },
        config
      );
      console.log("password changed successfully");
      navigate("/login");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    //   setIsRegistered(true);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="h_darkBG">
      <div className="h_centered">
        <div className="h_outer_div">
          <div className="h_container">
            <div className="h_topic">Forgot Password</div>
            {/* <button className="h_cross" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button> */}
            <form>
              <label className="h_label">Email:</label>
              <br />
              <input
                className="h_input"
                placeholder="abc@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="h_label">New Password</label>
              <br />
              <div className="h_password h_input">
                <input
                  className="h_input_password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewpassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon
                  className="h_icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                />
              </div>
              <label className="h_label">Confirm New Password</label>
              <br />
              <div className="h_password h_input">
                <input
                  className="h_input_password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewconfirmpassword(e.target.value)}
                  placeholder="Confirm your password"
                />
                <FontAwesomeIcon
                  className="h_icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="h_button_div">
                <input
                  className="h_button"
                  type="submit"
                  value="Update"
                  onClick={submitHandler}
                  // isLoading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass