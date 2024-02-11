import UserModel from "../models/UserModel.js";

//To be removed---------
import fs from 'fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allGenresPath = path.join(__dirname, '..', 'data', 'allGenres.json');
const allTrendingPath = path.join(__dirname, '..', 'data', 'trendings.json');
//To be removed---------


//getting all trending videos(movies/tv_series)
export const getAllTrendingVideos = async (req, res) => {
    try {


        //to be removed
        if (fs.existsSync(allTrendingPath)) {
            let genres = JSON.parse(fs.readFileSync(allTrendingPath, 'utf-8'));
            return res.status(200).json(genres);
        } 
        //=========

        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${apiKey}`
        );
        return res.status(200).json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting recommendation for a particular user
export const getRecommendedations = async(req, res)=>{
    try {
        //getting user info embedded by middleware in request object after token verification.
        const user = req.user
        //finding all favourite generas for a user
        const userData = await UserModel.findById(user.id).select({genres: 1})

        const allFavGenres = userData.genres;
        //getting all movies based on generas
        const movieData = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${allFavGenres.join(',')}`
        );

        //getting all tv series based on generas
        const tvSeriesData = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${allFavGenres.join(',')}`
        );

        let allRecommnededVideos = [...movieData.data.results, ...tvSeriesData.data.results]

        //sorting videos based on their release date in ascending order
        allRecommnededVideos.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1)
        
        return res.status(200).json({status:true, data: allRecommnededVideos});

    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}

// Search all videos(movies/tv_series) by its title
export const searchVideoByTitle = async (req, res) => {
    const {pageNo, title} = req.query
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
        );
        return res.status(200).json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};


// add Favourite genres to particular user document

export const addFavouriteGenres = async(req, res)=>{
    const {genresList} = req.body
    try {
        const user = req.user
        await UserModel.findByIdAndUpdate(
            user.id,
            {$push: {genres: {$each:genresList }}}
        )
        return res.status(200).json({status:true, data:"Favourite genres updated successfully"});

    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}


//Function to get all genres so that user can select their favourite genres
export const getAllGenres = async(req, res)=>{
    try {
        if (fs.existsSync(allGenresPath)) {
            let genres = JSON.parse(fs.readFileSync(allGenresPath, 'utf-8'));
            return res.status(200).json({status:true, data: genres});
        } 
        else {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }
    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}