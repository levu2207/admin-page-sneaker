import React, { useState, useEffect, useRef } from "react";
import Input from "../Components/Input";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/auth";
import CustomButton from "../Components/CustomButton";

const Login = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [isWaiting, setIsWaiting] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsWaiting(true);
    userService.login(email, password).then((res) => {
      setIsWaiting(false);
      if (res.errorCode === 0) {
        setMessage("");
        dispatch(
          login({
            token: res.data.accessToken,
            userInfo: res.data,
          })
        );
        navigate("/home");
      } else {
        setMessage(`${res.message}`);
      }
    });
  };

  return (
    <>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill me-2" />
                  Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler}>
                  <Input
                    inputRef={emailRef}
                    id="txtUsername"
                    label="Email"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Username"
                  />

                  <Input
                    inputRef={passwordRef}
                    id="txtPassword"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Password"
                  />

                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <CustomButton
                        type="submit"
                        icon="bi-box-arrow-in-right"
                        color="primary"
                        disabled={isWaiting}
                        isLoading={isWaiting}
                      >
                        Sign In
                      </CustomButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
