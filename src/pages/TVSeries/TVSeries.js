import axios  from 'axios';
import { useEffect, useState } from 'react';
import Genres from '../../components/Genres/Genres';
import CustomPagenation from '../../components/Pagenation/CustomPagenation';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';
import './TVSeries.css'



const TVSeries = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)
    const[selectedGenres, setSelectedGenres] = useState([])
    const[genres, setGenres] = useState([])
    const genreURL = useGenre(selectedGenres)
    const fetchTVSeries = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`)
            setContent(data.results)
        setNoOfPages(data.total_pages)
    }
    useEffect(() =>
        fetchTVSeries(),
        
        // eslint-disable-next-line
        [page, genreURL])

    return (
        <div>
            <span className="page-title">TVSeries</span>
            <Genres 
                genres={genres}
                selectedGenres={selectedGenres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                page={page}
                setPage={setPage}
            />
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
            {noOfPages > 1 &&
                <CustomPagenation setPage={setPage} numOfPages={noOfPages} />
            
            }
        </div>
    )
}

export default TVSeries
