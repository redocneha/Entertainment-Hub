import { Chip } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"

const Genres = ({ genres, selectedGenres, setGenres, setSelectedGenres, type,page, setPage }) => {
    const fetchGenres =  async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
        setGenres(data.genres)
       
        
        
    }
    const handleAddGenre = (genre) => {
       
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => genre.id !== g.id))
        setPage(1)
    }
    const handleRemoveGenre = (genre) => {
        setGenres([...genres, genre])
        setSelectedGenres(selectedGenres.filter((g) => genre.id !== g.id))
        setPage(1)
    }
    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({});
       } 
    },[])
    return (
        <div style={{ paddinng: "6px 0" }}>
            {selectedGenres.length>=1 && selectedGenres.map((selected) => {
                return <Chip id={selected.id} label={selected.name} color="primary" style={{ margin: "2px" }} size="small" clickable onDelete={ ()=> handleRemoveGenre(selected)}/>
            })}
            {genres.length>=1 && genres.map((genre) => {
                return <Chip id={genre.id} label={genre.name} style={{ margin: "2px" }} size="small" clickable onClick={()=>handleAddGenre(genre)}/>
            })}
        </div>
    )
}

export default Genres
