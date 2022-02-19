import './Navbar.scss';
import { Search, Notifications, ArrowDropDownSharp } from '@material-ui/icons'
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { logoutfunc } from '../../context/authContext/apiCall';
import { AuthContext } from '../../context/authContext/AuthContext';
import axios from 'axios';

const Navbar = () => {
    let [isScrolled, setIsScrolled] = useState(false);
    const { dispatch,user } = useContext(AuthContext);
    const [userInfo, SetUserInfo] = useState({});
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    const handleLogout = () => {
        logoutfunc(dispatch);
    }
    useEffect(() => {
        const getUserInfo = async () => {
            const res = await axios.get('user/get/' + user._id, { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
            SetUserInfo(res.data);
        }
        getUserInfo();
    }, [user])
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    </Link >
                    <Link to="/" className="link">
                        <span>Home</span>
                    </Link >
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Movie</span>
                    </Link>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <Notifications className="icon" />
                    <Link to="/user" className="link">
                        <img src={userInfo.avatar} alt="" />
                    </Link>
                    <div className="profile">
                        <ArrowDropDownSharp className="icon" />
                        <div className="options">
                            <Link to="/user" className="link">
                                <span>Setting</span>
                            </Link>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
