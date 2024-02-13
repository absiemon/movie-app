import axios from 'axios'
const apiKey = process.env.TMDB_API_KEY;
//To be removed---------
import fs from 'fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allGenresPath = path.join(__dirname, '..', 'data', 'movies.json');
//To be removed---------

//Getting all movies with pagination
export const getAllMovies = async (req, res) => {
    const { search, pageNo } = req.query;
    try {
        
        // //To be removed-------------
        if (fs.existsSync(allGenresPath)) {
            let genres = JSON.parse(fs.readFileSync(allGenresPath, 'utf-8'));
            return res.status(200).json(genres);
        } 
        // //To be removed-------------

        if(search.length === 0){
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }
        else{
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&include_adult=true&language=en-US&page=${pageNo}&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }

    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting a single movie by its id
export const getSingleMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        console.log(apiKey)

        let response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=casts&language=en-US&api_key=${apiKey}`
        );

        //refactring casts array because unessessary casts are coming
        const newResponse = response.data;
        let releventCasts = newResponse?.casts?.cast;
        const {casts, ...resWithoutCredits} = newResponse;
        
        let finalResponse = {...resWithoutCredits, casts: releventCasts}
        
        return res.status(200).json(finalResponse);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};


