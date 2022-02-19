import './ListItem.scss'
import { Add, PlayArrow, ThumbDown, ThumbUp } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

const ListItem = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(`movie/get/${item}`);
                setMovie(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMovie();
    }, [item])
    return (
        <Link to={"/watch"} state = {{
                movie: movie
            }}
         className="link">
            <div className="ListItem"
                style={{ left: isHovered && index * 220 - 50 + index * 5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie.imageSmall} alt="" />
                {isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop></video>
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUp className="icon" />
                                <ThumbDown className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.title}</span>
                                <span className="limit">16+</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">
                                {movie.desc}
                            </div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}

export default ListItem
