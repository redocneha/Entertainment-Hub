import { Badge } from "@material-ui/core"
import { img_300, unavailable } from "../../config/config"
import ContentModal from "../ContentModal/ContentModal"
import './SingleContent.css'

const SingleContent = ({ id,title,poster,rating,date,mediaType } ) => {
    return (
        <ContentModal id={id} mediaType={mediaType}>
            <Badge badgeContent={rating} color={rating>6?"primary":"secondary"}/>
            <img className="poster" src={poster ? `${img_300}/${poster}` : `${unavailable}`} alt={title} />
            <b className="title">{title}</b>
            <span className="subtitle">
                {mediaType === "tv" ? "TV Series" : "Movie"}
                <span className="subtitle">{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
