import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addToFavouriteMovie,
  getAllMoviesForCustomer,
  getFavouriteMoviesForCustomer,
  removeFromFavouriteMovie,
} from "../actions/customer";
import { movieType } from "../types";
import { GiThreeFriends } from "react-icons/gi";
import { AiFillYoutube, AiFillHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { motion } from "framer-motion";
import { Card, Tooltip, Modal } from "antd";
import Loader from "../components/Loader";
import { AxiosError } from "axios";
import { tailwindCssConstant } from "../utils/css";
import YouTubePlayer from "../components/YoutubePlayer";
import FriendsGroup from "../components/FriendsGroup";

const { Meta } = Card;

const CustomerHome: React.FC = () => {
  const queryClient = useQueryClient();
  const [favouriteModal, setFavouriteModal] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [Movie, setMovie] = useState<movieType | null>(null);

  // get all movies for the customer plan
  const { data: movies, isLoading } = useQuery<movieType[]>(
    "movies",
    async () => {
      return await getAllMoviesForCustomer();
    }
  );

  // get all favourite movies of the customer
  const { data: favouriteMovies, isLoading: isFavouriteMoviesLoading } =
    useQuery<string[]>("favourite-movies", async () => {
      return await getFavouriteMoviesForCustomer();
    });

  // add to favourite movies
  const { mutateAsync: addToFavourite, isLoading: isAddToFavouriteLoading } =
    useMutation(addToFavouriteMovie, {
      onSuccess() {
        queryClient.invalidateQueries("favourite-movies");
      },
      onError(error) {
        const err = error as AxiosError;
        console.error(err);
      },
      onSettled() {
        setMovie(null);
      },
    });

  // remove movie from favourite movies list
  const {
    mutateAsync: removeFromFavourite,
    isLoading: isRemoveFromFavouriteLoading,
  } = useMutation(removeFromFavouriteMovie, {
    onSuccess() {
      queryClient.invalidateQueries("favourite-movies");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
    },
    onSettled() {
      setMovie(null);
    },
  });

  const addOrRemoveMovie = (movie: movieType) => {
    setMovie(movie);
    if (favouriteMovies?.includes(movie._id!)) {
      removeFromFavourite(movie._id!);
    } else {
      addToFavourite(movie._id!);
    }
  };

  const openVideoModal = (movie: movieType) => {
    setMovie(movie);
    setVideoModal(true);
  };

  const closeVideoModal = () => setVideoModal(false);

  const openFriendsModal = () => {
    setFriendsModal(true);
  };

  const favouriteMoviesList = movies?.filter((movie) =>
    favouriteMovies?.includes(movie._id!)
  );

  return (
    <div>
      <div className="flex justify-end gap-6">
        <button
          onClick={openFriendsModal}
          className={tailwindCssConstant.blueButton()}
        >
          <GiThreeFriends className="w-3.5 h-3.5 mr-2" />
          Friends Group
        </button>
        <button
          onClick={() => setFavouriteModal(true)}
          className={tailwindCssConstant.blueButton()}
        >
          <AiFillHeart className="w-3.5 h-3.5 mr-2" />
          Favourite Movies
        </button>
      </div>
      {isLoading && (
        <div className="grid  place-content-center my-24">
          <Loader />
        </div>
      )}

      <section className="flex flex-wrap items-center md:items-start flex-col md:flex-row gap-12 mt-6 ">
        {!isLoading &&
          movies?.map((movie) => {
            return (
              <Card
                style={{ width: 340 }}
                key={movie._id}
                className="hover:scale-105 transition-all 100s ease-in-out"
                cover={
                  <img
                    alt={movie.title}
                    style={{ height: "240px" }}
                    className="w-full h-60 object-center object-cover rounded-md"
                    src={movie.imgUrl}
                  />
                }
              >
                <div className="min-h-100">
                  <Meta title={movie.title} />
                  <p className="pt-2">
                    {movie.description.length > 130 ? (
                      <Tooltip
                        title={movie.description}
                        placement="bottomRight"
                      >
                        {movie.description.slice(0, 130)}...
                      </Tooltip>
                    ) : (
                      <span>{movie.description}</span>
                    )}
                  </p>
                </div>
                <div className="mt-2 py-2 flex items-center justify-between">
                  <button
                    className={tailwindCssConstant.redButton()}
                    onClick={() => openVideoModal(movie)}
                  >
                    <AiFillYoutube size={24} className="mr-2" />
                    Watch Video
                  </button>

                  <Tooltip
                    title={
                      favouriteMovies?.includes(movie._id!)
                        ? "Remove From Favourite"
                        : "Add To Favourite"
                    }
                  >
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => addOrRemoveMovie(movie)}
                      className={`w-10 h-10 rounded-full ${
                        favouriteMovies?.includes(movie._id!)
                          ? "bg-red-600"
                          : "bg-green-600"
                      }
                       flex items-center transition-all 100s ease-in-out justify-center cursor-pointer hover:shadow-md`}
                    >
                      {/* loader for favourites  */}
                      {(isAddToFavouriteLoading ||
                        isRemoveFromFavouriteLoading) &&
                      movie._id === Movie!._id ? (
                        <Loader restStyles="text-white w-8" />
                      ) : (
                        <AiFillHeart size={18} className="text-white" />
                      )}
                    </motion.div>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
      </section>
      {/* Watch Video Modal */}
      <Modal
        title={
          <p className="font-bold text-2xl capitalize mb-3 flex  items-center">
            <BiMoviePlay className="mr-1" />
            {Movie?.title}
          </p>
        }
        open={videoModal}
        onOk={closeVideoModal}
        onCancel={closeVideoModal}
        footer={null}
        destroyOnClose={true}
      >
        <YouTubePlayer videoId={`${Movie?.srcUrl}`} />
      </Modal>
      {/* Favourite Movies List Modal */}
      <Modal
        title={
          <p className="font-bold flex items-center gap-1">
            <AiFillHeart size={18} />
            Favourite Movies
          </p>
        }
        open={favouriteModal}
        onOk={() => setFavouriteModal(false)}
        onCancel={() => setFavouriteModal(false)}
        footer={null}
      >
        <div className="my-6">
          {isLoading && (
            <div className="grid  place-content-center my-6">
              <Loader />
            </div>
          )}
          {/* show only favourite movies of the user */}
          {(!isLoading || !isFavouriteMoviesLoading) &&
          favouriteMoviesList?.length === 0 ? (
            <div className="text-center my-6 font-semibold">
              No Favourite Movies Found.
            </div>
          ) : (
            favouriteMoviesList?.map((movie) => {
              return (
                <div
                  className="border border-gray-400 shadow rounded-lg px-3 py-2 my-2 flex justify-between items-center"
                  key={movie._id}
                >
                  <p className="capitalize font-semibold">{movie.title}</p>
                  <p className="flex gap-3 items-center">
                    <Tooltip title={`Watch ${movie.title}`}>
                      <AiFillYoutube
                        size={30}
                        onClick={() => openVideoModal(movie)}
                        className="text-red-500 cursor-pointer"
                      />
                    </Tooltip>
                    <Tooltip
                      title={
                        favouriteMovies?.includes(movie._id!)
                          ? "Remove From Favourite"
                          : "Add To Favourite"
                      }
                    >
                      <AiFillHeart
                        onClick={() => addOrRemoveMovie(movie)}
                        size={24}
                        className="text-rose-400 cursor-pointer"
                      />
                    </Tooltip>
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Modal>
      {/* Friends Group Modal  */}
      <Modal
        title={
          <p className="font-bold flex items-center gap-1">
            <GiThreeFriends className="w-3.5 h-3.5 mr-2" />
            Friends Group
          </p>
        }
        open={friendsModal}
        onOk={() => setFriendsModal(false)}
        onCancel={() => setFriendsModal(false)}
        footer={null}
      >
        <FriendsGroup />
      </Modal>
    </div>
  );
};

export default CustomerHome;
