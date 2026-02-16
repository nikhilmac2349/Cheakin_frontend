import React, { useEffect } from "react";
import "./Contact.css"
import { useNavigate } from "react-router";

const Contact = () => {

    const user = localStorage.getItem("userlogin");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user) navigate('/login')
    } , [user])
  return (

    <div id="maindiv">
    <div className="page">
      <h1>Contact</h1>

      <p>
        For any queries, feedback, or support related to the Check-In Management
        System, feel free to reach out.
      </p>

      <p>Email: support@checkinsystem.edu</p>
      <p>Phone: +91 98765 43210</p>
      <p>Office Hours: Mon – Fri, 10:00 AM – 5:00 PM</p>
    </div>
    </div>
  );
};

export default Contact;
