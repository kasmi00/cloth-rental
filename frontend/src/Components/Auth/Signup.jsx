import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
const signupInitialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  image: "",
};

const Signup = () => {
  let navigate = useNavigate();
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState();
  const [uploadImageError, setuploadImageError] = useState("");
  const [file, setFile] = useState("");
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async (e) => {
    e.preventDefault();

    if (!validateForm(signup)) {
      return;
    }

    try {
      let response = await API.userSignup(signup);

      if (response && response.isSuccess) {
        setError("");
        setSignup(signupInitialValues);
        navigate("/login");
      } else {
        setError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      setError("Something went wrong! Please try again later.");
    }
  };
  const validateForm = (signup) => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneRegex = /^\d{10}$/;

    if (!signup.name || !signup.email || !signup.phone || !signup.password) {
      setError("Please fill in all the required fields.");
      return false;
    }

    if (!nameRegex.test(signup.name)) {
      setError("Name should contain atleast 3 character.");
      return false;
    }

    if (!emailRegex.test(signup.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!phoneRegex.test(signup.phone)) {
      setError("Phone number should contain exactly 10 digits.");
      return false;
    }
    if (signup.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        // Check if the selected file is a valid image (jpg or png)
        if (file.type === "image/jpeg" || file.type === "image/png") {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          // API Call
          const response = await API.uploadFile(data);
          signup.image = response.data;

          setuploadImageError("");
        } else {
          setuploadImageError("please upload png or jpg image");
        }
      }
    };
    getImage();
  }, [file]);

  return (
    <>
      <div
        style={{
          // backgroundColor: "#ffe6e6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center"> Signup Form</h3>
              <form autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                    style={{ borderRadius: "5px" }}
                    autoComplete="name"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    style={{ borderRadius: "5px" }}
                    autoComplete="email"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    required
                    style={{ borderRadius: "5px" }}
                    autoComplete="phone"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    style={{ borderRadius: "5px" }}
                    autoComplete="current-password"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="image">Upload Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {uploadImageError && (
                    <div className="error-message">{uploadImageError}</div>
                  )}
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
                  type="submit"
                  className="btn btn-success"
                  style={{
                    background: "#007BFF",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: " 10px 20px",
                    margin: "10px 100px",
                  }}
                  onClick={(e) => signupUser(e)}
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
