import { Button, Tabs,Tab, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {
    useEffect,
    useState
} from "react";
import axios
    from "axios";
import './Search.css'
import { createTheme, ThemeProvider } from '@material-ui/core';
import CustomPagenation from "../../components/Pagenation/CustomPagenation";
import SingleContent from "../../components/SingleContent/SingleContent";

const darkTheme = createTheme({
    palette: {
        type: 'dark'
    },
    primary: {
        main:"#fff"
    }
})

const Search = () => {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState()
    const [content, setContent] = useState([]);
    const [noOfPages, setNoOfPages] = useState();

    const fetchSearch = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=${process.env.REACT_APP_KEY}&query=${searchText}&language=en-US&page=${page}&include_adult=false`)
        setContent(data.results)
        setNoOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0,0)
        fetchSearch()
    },[type,page])
    return (
        <div>
            <ThemeProvider theme={darkTheme}>

                <div style={{display:'flex',margin:'15px 0'}}>
                <TextField
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(event)=>{setSearchText(event.target.value)}}
                    />
                    <Button variant="contained" style={{marginLeft:'10px'}} onClick={fetchSearch}>
                        {" "}
                        <SearchIcon/>
                    </Button>
                </div>
                <Tabs
                    value={type}
                    style={{paddingBottom:'5px'}}
                    onChange={(event,newValue) => {
                        setType(newValue);
                        setPage(1)
                    }}
                >
                    <Tab  label="Search Movies" />
                    <Tab  label="Search TV Series"/>
                </Tabs>

                <div className="search" >
                {content && content.map((show) => {
                    return <SingleContent
                        
                        key={show.id}
                        id={show.id}
                        poster={show.poster_path}
                        title={show.title || show.name}
                        rating={show.vote_average}
                        date={show.first_air_date || show.release_date}
                        mediaType={type?"tv":"movie"}
                    />
                })}
                    
                    {
                        searchText && !content &&
                        <h2>No Movies found</h2>
                    }
            </div>
                {noOfPages>1 &&
                    <CustomPagenation setPage={setPage} numOfPages={noOfPages} />}
            
           
            </ThemeProvider>
            
        </div>
    )
}

export default Search
