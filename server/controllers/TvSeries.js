const apiKey = process.env.TMDB_API_KEY;

//To be removed---------
import fs from 'fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allGenresPath = path.join(__dirname, '..', 'data', 'tvseries.json');
//To be removed---------

//Getting all tv series
export const getAllTvSeries = async (req, res) => {
    const { search, pageNo } = req.query;
    try {
         //To be removed-------------
         if (fs.existsSync(allGenresPath)) {
            let genres = JSON.parse(fs.readFileSync(allGenresPath, 'utf-8'));
            return res.status(200).json({status:true, data: genres});
        } 
        //To be removed-------------
        
        if(search.length === 0){

            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
                );
                return res.status(200).json(response.data);
        }
        else{
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(search)}&include_adult=true&language=en-US&page=1&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting a single tv series by its id

export const getSingleTvSeries = async (req, res) => {
    const { seriesId } = req.params;
    try {
        let response = await axios.get(
            `https://api.themoviedb.org/3/tv/${seriesId}?append_to_response=credits&language=en-US&api_key=${apiKey}`
        );

        const newResponse = response.data;
        let casts = newResponse?.credits?.cast;
        const {credits, ...resWithoutCredits} = newResponse;
        
        let finalResponse = {...resWithoutCredits, casts: casts}

        return res.status(200).json(finalResponse);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

// getting tv series by its title (For searching)
export const getSingleSeriesByTitle = async (req, res) => {
    const { pageNo, title } = req.query;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(title)}&include_adult=true&language=en-US&page=1&api_key=${apiKey}`
        );
        return res.status(200).json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};