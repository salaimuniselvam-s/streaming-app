const express = require("express");
const { Movies } = require("../model/moviesModel");
const {
  authenticateJWT,
  authenicateAdmin,
} = require("../middleware/verifyJwtToken.js");
const {
  UploadVideo,
  getAllMovies,
  addNewPlan,
  removePlan,
  updatePlansByMovieId,
} = require("../controllers/admin.js");

const router = express.Router();

router.post("/upload-video", authenticateJWT, authenicateAdmin, UploadVideo);

router.get("/get-all-videos", authenticateJWT, authenicateAdmin, getAllMovies);

router.get("/delete-movies", async (req, res) => {
  await Movies.deleteMany();
  res.send("deleted");
});

router.post("/add-new-plans", authenticateJWT, authenicateAdmin, addNewPlan);

router.put(
  "/update-movie-plans/:id",
  authenticateJWT,
  authenicateAdmin,
  updatePlansByMovieId
);

router.delete(
  "/remove-plan/:id",
  authenticateJWT,
  authenicateAdmin,
  removePlan
);

module.exports = router;
