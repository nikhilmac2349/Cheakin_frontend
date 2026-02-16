import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import "./Login.css";
import { fetchProfessors, verifyuser } from '../../redux/userReducer';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [massage, setMassage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.users);


    

    useEffect(() => {
        dispatch(fetchProfessors());
    }, [dispatch]);

    const userr = localStorage.getItem("userlogin")

    useEffect(() => {
        if (userr) navigate('/');
    }, [userr, navigate]);

    useEffect(() => {
        if (error) setMassage(error);
    }, [error]);

    function handleclick() {
        setMassage("");
        dispatch(verifyuser({ email, password }));
    }

    return (
        <div className='main_div'>
            <div id='border_div'>
                <div>Login</div>
                <div>
                    <label htmlFor="input_usernmae">Email</label>
                    <br />
                    <input
                        type="text"
                        id='input_usernmae'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />

                    <label htmlFor="input_password">Password</label>
                    <br />
                    <input
                        type="password"
                        id='input_password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />

                    <button type='submit' onClick={handleclick}>Login</button>
                    <br />

                    <p id='error-massage'>{massage}</p>

                    <p className="signup-text">
                        New User? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
