import './Watch.scss'
import { ArrowBackSharp } from '@material-ui/icons'
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
    const location = useLocation();
    const movie = location.state.movie;
    return (
        <div className="watch">
            <Link to="/" className="link">
                <div className="back">
                    <ArrowBackSharp />
                    Home
                </div>
            </Link>
            <video className="video" autoPlay progress controls src={movie.video}></video>
        </div>
    )
}

export default Watch
