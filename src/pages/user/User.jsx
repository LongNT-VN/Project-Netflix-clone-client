import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../context/authContext/AuthContext';
import { updateUser } from '../../context/userContext/apiCall';
import { UserContext } from '../../context/userContext/UserContext';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './User.scss'

const User = () => {
    const [avatar, setAvatar] = useState({});
    const { user } = useContext(AuthContext);
    const [userInfo, SetUserInfo] = useState({});
    const { dispatch } = useContext(UserContext);
    const [userUpdate, setUserUpdate] = useState(user);
    const [userUpdatePassword, setUserUpdatePassword] = useState({ "_id": user._id });
    const [show, setShow] = useState(false);
    const [uploaded, setUploaded] = useState(0);

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await axios.get('user/get/' + user._id, { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
            SetUserInfo(res.data);
        }
        getUserInfo();
    }, [user])

    let navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUserUpdate({ ...userUpdate, [e.target.name]: value });
    }
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setUserUpdatePassword({ ...userUpdatePassword, [e.target.name]: value });
    }
    const updateInfo = (e) => {
        e.preventDefault();
        updateUser(userUpdate, dispatch);
        alert("Update sucessfully!");
        navigate("/", { replace: true });
    }
    const updatePassword = (e) => {
        e.preventDefault();
        updateUser(userUpdatePassword, dispatch);
        alert("Update sucessfully!");
        navigate("/", { replace: true });
    }
    const changePassword = () => {
        const divChange = document.getElementsByClassName("changePassword")[0];
        if (divChange.getAttribute("style") === "display: flex") {
            divChange.setAttribute("style", "display: none");
            setShow(false)
        }
        else {

            divChange.setAttribute("style", "display: flex");
            setShow(true)
        }
    }

    const upload = (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + '_' + item.label + '_' + item.file.name;
            const storageRef = ref(storage, `/user/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on("state_changes", snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Uploaded " + progress + " %");
            }, (err) => { console.log(err) }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUserUpdate((prev) => {
                        return { ...prev, [item.label]: downloadURL }
                    })
                    setUploaded((prev) => prev + 1);
                })
            }
            )
        })
    }
    console.log(userUpdate)
    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: avatar, label: "avatar" },
        ])
    }

    return (
        <div className="user">
            <Navbar />
            <div className="userTop">
                <img src={userInfo.avatar} alt="" />
                <span>{user.name}</span>
            </div>
            <div className="userInfo">
                <input defaultValue={userInfo.email} name="email" type="text" onChange={handleChange} />
                <input defaultValue={userInfo.name} name="name" type="text" onChange={handleChange} />
                <input defaultValue={userInfo.age} name="age" type="text" onChange={handleChange} />
                <input defaultValue={userInfo.numberPhone} name="numberPhone" type="text" onChange={handleChange} />
                <div className="avatar">
                    <span className="avatarLabel">New avatar ?</span>
                    <input name="avatar" type="file" onChange={(e) => setAvatar(e.target.files[0])} className="inputAvatar" />
                </div>
                <div className="button">
                    {(uploaded === 1) ?
                        <button className="updateButton" onClick={updateInfo}>Update Info</button> :
                        <button className="uploadButton" onClick={handleUpload}>Upload image</button>}
                </div>
            </div>
            <div className="changePasswordButtonDiv" onClick={changePassword}>
                <p className="changePasswordButton">Change Password</p>
                {
                    show ? <ArrowDropUp /> : <ArrowDropDown />
                }

            </div>
            <div className="changePassword">
                <div className="yourPassword inputPassword">
                    <span>Your password</span>
                    <input placeholder="Password" name="oldPassword" type="password" onChange={handleChangePassword} />
                </div>
                <div className="newPassword inputPassword">
                    <span>New password</span>
                    <input placeholder="New password" name="Password" type="password" onChange={handleChangePassword} />
                </div>
                <div className="button">
                    <button className="updateButton" onClick={updatePassword}>Update Password</button>
                </div>
            </div>
        </div>
    )
}

export default User
