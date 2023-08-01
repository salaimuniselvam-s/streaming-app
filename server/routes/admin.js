const express = require("express");
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
  deleteMovieById,
} = require("../controllers/admin.js");

const router = express.Router();

router.post("/upload-video", authenticateJWT, authenicateAdmin, UploadVideo);

router.get("/get-all-videos", authenticateJWT, authenicateAdmin, getAllMovies);

router.delete(
  "/delete-movie/:id",
  authenticateJWT,
  authenicateAdmin,
  deleteMovieById
);

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
