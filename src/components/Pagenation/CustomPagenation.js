import Pagination  from "@material-ui/lab/Pagination"
import { createTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createTheme({
    palette: {
        type:'dark'
    }
})
const CustomPagenation = ({setPage,numOfPages}) => {
    const handlePageChange = (page) => {
        setPage(page)
    }
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} />
             </ThemeProvider>
        </div>
    )
}

export default CustomPagenation
