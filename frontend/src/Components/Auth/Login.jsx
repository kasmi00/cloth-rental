import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      let response = await API.userLogin(login);
      if (response && response.isSuccess) {
        console.log("REsponse DAta", response.data);
        setError("");
        sessionStorage.setItem(
          "accesstoken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        console.log("response in login", response.data);
        setAccount((prevAccount) => {
          const updatedAccount = {
            name: response.data.name,
            phone: response.data.phone,
            role: response.data.role,
            image: response.data.image,
            _id: response.data._id,
          };

          localStorage.setItem("UserInfo", JSON.stringify(updatedAccount));
          return updatedAccount;
        });
        setLogin(loginInitialValues);
        navigate("/");
      } else {
        setError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong ! Please try again later.");
    }
  };
  return (
    <div
      className="container-fluid mt-6"
      // style={{ backgroundColor: "2333eeed" }}
    >
      <div className="row  justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="email"
                    value={login.email}
                    name="email"
                    style={{ borderRadius: "5px" }}
                    autoComplete="email"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control  form-control-sm"
                    id="password"
                    value={login.password}
                    name="password"
                    onChange={(e) => onInputChange(e)}
                    autoComplete="current-password"
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                {error && (
                  <span
                    style={{
                      color: "#c93737",
                      fontSize: "14px",
                      marginTop: "5px",
                      lineHeight: "0",
                      fontWeight: "600",
                    }}
                  >
                    {error}
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#007BFF",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: " 10px 20px",
                    margin: "10px 140px",
                  }}
                  onClick={(e) => loginUser(e)}
                >
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                Don't have an account?<Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
