import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addprofessure, fetchProfessors } from "../../redux/userReducer";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [massage, setMassage] = useState("");

  const dispatch = useDispatch();

  const professors = useSelector(state => state.users.professors);


  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfessors());
  }, []);



  function handleclick() {

    const now = new Date();

    const professorId =
      "P" +
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    const auth = {
      professorId  : professorId ,
      name: name,
      department: department,
      email: email,
      password: password,

    };

    let isalready = false;

    console.log(professors);

    for (let x of  professors) {
      if (x.email === email) {
        isalready = true;
        break;
      }
    }
    if(isalready){
      setMassage("User already registered with This Email");
    }
    else{
      dispatch(addprofessure(auth));
      navigate("/login")
    }
  }

  function handlelogin(value){
    setMassage("");
    setEmail(value)
  }

  return (
    <div className="main_div">
      <div id="border_div">
        <h2>Sign Up</h2>

        <label htmlFor="input_name" required>Name*</label>
        <input
          type="text"
          id="input_name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="input_email">Email*</label>
        <input
          type="email"
          id="input_email"
          onChange={(e) => handlelogin(e.target.value)}
          required
        />

        <label htmlFor="input_password">Password*</label>
        <input
          type="password"
          id="input_password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="department">Department*</label>
        <input
          type="text"
          id="department"
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button onClick={handleclick}>Sign Up</button>

        <p id="error-massage">{massage}</p>

        <p className="signup-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
