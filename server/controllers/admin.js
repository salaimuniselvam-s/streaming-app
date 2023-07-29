const { Movies } = require("../model/moviesModel");
const { PlanDetails } = require("../model/planModel");

/**
 * @description Upload Videos to the server
 */
const UploadVideo = async (req, res) => {
  const { title, description, imgUrl, srcUrl, plans } = req.body;
  try {
    const isExistMovie = await Movies.findOne({ title });
    if (isExistMovie) {
      return res.status(409).json("Movie already exists");
    }
    const movie = new Movies({
      title,
      description,
      imgUrl,
      srcUrl,
      plans,
    });
    await movie.save();
    res.status(200).json("Video uploaded successfully");
  } catch (error) {
    return res.status(400).send("Upload Failed");
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    return res.status(200).json(movies);
  } catch {
    return res.status(400).send("Fetching Movies Failed.. Please Try Again");
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await PlanDetails.find();
    return res.status(200).json(plans);
  } catch {
    return res.status(400).send("Fetching Plans Failed.. Please Try Again");
  }
};

const addNewPlan = async (req, res) => {
  const { title, price } = req.body;
  try {
    const isPlanExist = await PlanDetails.findOne({
      title,
    });
    if (isPlanExist) {
      return res.status(409).json("Plan already exists");
    }

    const plans = new PlanDetails({
      title,
      price,
    });
    await plans.save();
    return res.status(200).json(plans);
  } catch {
    return res.status(400).send("Adding Plans Failed.. Please Try Again");
  }
};

const updatePlansByMovieId = async (req, res) => {
  const { id } = req.params;
  const { plans } = req.body;

  try {
    const movie = await Movies.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.plans = plans;

    const updatedMovie = await movie.save();

    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update movie plans", error: error.message });
  }
};

const removePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const removedPlan = await PlanDetails.findByIdAndRemove(planId);
    if (!removedPlan) {
      return res.status(404).send("Plan not found");
    }
    return res.status(200).json(removedPlan);
  } catch (error) {
    return res.status(400).send("Removing Plan Failed.. Please Try Again");
  }
};

module.exports = {
  UploadVideo,
  getAllMovies,
  getAllPlans,
  addNewPlan,
  removePlan,
  updatePlansByMovieId,
};
