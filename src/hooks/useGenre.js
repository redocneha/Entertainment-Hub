const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1)
        return ""
    const genreId = selectedGenres.map((genre) => { return genre.id })
    return genreId.reduce((prev, id) => {
      return prev+','+id  
    },"")
}

export default useGenre;