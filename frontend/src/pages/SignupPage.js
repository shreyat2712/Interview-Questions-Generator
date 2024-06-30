import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@chakra-ui/react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
const SignupPage = ({ setIsOpen }) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const [pic, setPic] = useState();

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const navigateLogin = () => {
    navigate("/login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
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
        "/register",
        { name, email, password, pic },
        config
      );
      console.log("registered successfully");
      navigate("/login");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      dispatch(authActions.logout())
    } catch (error) {
      setLoading(false);
    }
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "talk-a-tive");
      data.append("cloud_name", "dlam0u6qf");
      fetch("https://api.cloudinary.com/v1_1/dlam0u6qf/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an image to upload",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <div className="h_darkBG">
      <div className="h_centered">
        <div className="h_outer_div">
          <div className="h_container">
            <div className="h_topic">Register</div>
            {/* <button className="h_cross" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button> */}
            <form>
              <label className="h_label">Name:</label>
              <br />
              <input
                className="h_input"
                placeholder="Enter your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label className="h_label">Email:</label>
              <br />
              <input
                className="h_input"
                placeholder="abc@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="h_label">Password</label>
              <br />
              <div className="h_password h_input">
                <input
                  className="h_input_password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon
                  className="h_icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                />
              </div>
              <label className="h_label">Confirm Password</label>
              <br />
              <div className="h_password h_input">
                <input
                  className="h_input_password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  placeholder="Confirm your password"
                />
                <FontAwesomeIcon
                  className="h_icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                />
              </div>
              {/* <input
                className="h_inputImage"
                type="file"
                p="1.5"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              /> */}
              {/* <div className="h_forgotpass">Forgot Password?</div> */}
              <br />
              <div className="h_button_div">
                <input
                  className="h_button"
                  type="submit"
                  value="Register"
                  onClick={submitHandler}
                  // isLoading={loading}
                />
              </div>
              <div className="h_signup">
                Already have an account?{" "}
                <span className="h_signup_link" onClick={navigateLogin}>
                  Login
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
