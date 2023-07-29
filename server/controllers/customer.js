const { Movies } = require("../model/moviesModel");
const { UserDetails } = require("../model/userModel");

const getAllMoviesByCustomerPlan = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await UserDetails.findOne({ username });

    // filter movies by customer plan
    const movies = await Movies.find({ plans: { $in: [user.plan] } });

    return res.status(200).json(movies);
  } catch {
    return res.status(400).send("Fetching Movies Failed.. Please Try Again");
  }
};

// Route to add a movie to the user's favorite list
const addToFavouriteMovieForCustomer = async (req, res) => {
  const { movieId } = req.params;
  const { username } = req.user;

  try {
    const user = await UserDetails.findOneAndUpdate(
      { username }, // Find the user by their username
      { $addToSet: { favourites: movieId } },
      { new: true }
    );

    res.status(200).json("Movie added to favourites successfully");
  } catch (error) {
    res.status(500).json("Failed to add movie to favourites");
  }
};

// Route to remove a movie from the user's favorite list
const removeFromFavouriteMovieForCustomer = async (req, res) => {
  const { movieId } = req.params;
  const { username } = req.user;
  try {
    const user = await UserDetails.findOneAndUpdate(
      { username }, // Find the user by their username
      { $pull: { favourites: movieId } },
      { new: true }
    );

    res.status(200).json("Movie removed from favourites successfully");
  } catch (error) {
    res.status(500).json("Failed to remove movie from favourites");
  }
};

// Route to get favorite movies for a customer
const getFavouriteMoviesForCustomer = async (req, res) => {
  const { username } = req.user;

  try {
    const user = await UserDetails.findOne({ username }).populate("favourites");

    if (!user) {
      return res.status(404).json("User not found");
    }

    const favoriteMovies = user.favourites;
    res.status(200).json(favoriteMovies);
  } catch (error) {
    res.status(500).json("Failed to get favorite movies");
  }
};

module.exports = {
  getAllMoviesByCustomerPlan,
  addToFavouriteMovieForCustomer,
  removeFromFavouriteMovieForCustomer,
  getFavouriteMoviesForCustomer,
};
