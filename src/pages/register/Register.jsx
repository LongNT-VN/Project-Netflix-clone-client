import './Register.scss'
import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    let navigate = useNavigate();
    const emailRef = useRef();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const handleStarted = () => {
        setEmail(emailRef.current.value);
        setUser({ ...user, "email": emailRef.current.value });
    }
    const handleFinish = async (e) => {
        try {
            await axios.post("/auth/register", user);
            alert('Register success!!!');
            navigate("/login", { replace: true });
          } catch (err) {
            alert("Fail to register!");
          }
        e.preventDefault();
    }
    return (
        <div className="register">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                <Link to="/login">
                    <button className="loginButton">Sign In</button>
                </Link>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {!email ? <>
                    <div className="input">
                        <input placeholder="Email address" type="email" ref={emailRef} />
                        <button className="registerButton" onClick={handleStarted}>Get Started</button>
                    </div>
                </> : <>
                    <form className="input2">
                        <input value={email} name="email" type="text" onChange={handleChange} />
                        <input placeholder="Name" name="name" type="text" onChange={handleChange} />
                        <input placeholder="Age" name="age" type="text" onChange={handleChange} />
                        <input placeholder="Number Phone" name="numberPhone" type="text" onChange={handleChange} />
                        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
                        <button className="registerButton" onClick={handleFinish}>Start</button>
                    </form>
                </>
                }

            </div>
        </div>
    )
}
export default Register;
