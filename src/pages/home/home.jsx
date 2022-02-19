import { useState, useRef, useEffect, useContext } from "react";
import axios from 'axios';
import './home.scss'
import Navbar from '../../components/Navbar/Navbar'
import Featured from '../../components/Featured/Featured'
import List from '../../components/List/List'
import Upgrade from "../UpgradeVIP/Upgrade";
import { AuthContext } from "../../context/authContext/AuthContext";

const Home = ({ type }) => {
    const [genre, setGenre] = useState();
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                let res;
                if (type) {
                    res = await axios.get(`list/get${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);
                }
                else {
                    res = await axios.get(`list/get`);
                }
                setLists(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getRandomLists();
    }, [type, genre])
    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} genre={genre} />
            {
                lists.map((list) =>
                    (<List key={list._id} list={list} />)
                )
            }
        </div>
    )
}
export default Home