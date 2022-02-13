import axios  from 'axios';
import { useEffect, useState } from 'react';
import CustomPagenation from '../../components/Pagenation/CustomPagenation';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css'



const Trending = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_KEY}&page=${page}`)
        console.log(data)
        setContent(data.results)
    }
    useEffect(() => fetchTrending(),
        // eslint-disable-next-line
        [page])

    return (
        <div>
            <span className="page-title">Trending</span>
            <div className="trending" >
                {content && content.map((show) => {
                    return <SingleContent
                        key={show.id}
                        id={show.id}
                        poster={show.poster_path}
                        title={show.title || show.name}
                        rating={show.vote_average}
                        date={show.first_air_date || show.release_date}
                        mediaType={show.media_type}
                    />
                })}
            </div>

          <CustomPagenation setPage={setPage} numOfPages={10}/>  
            
           
        </div>
    )
}

export default Trending
