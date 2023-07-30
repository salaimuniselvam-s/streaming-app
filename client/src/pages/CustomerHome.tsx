import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addToFavouriteMovie,
  getAllMoviesForCustomer,
  getFavouriteMoviesForCustomer,
  removeFromFavouriteMovie,
} from "../actions/customer";
import { movieType } from "../types";
import { AiFillYoutube, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Card, Tooltip, Modal } from "antd";
import Loader from "../components/Loader";
import { AxiosError } from "axios";
import { tailwindCssConstant } from "../utils/css";
import YouTubePlayer from "../components/YoutubePlayer";

const { Meta } = Card;

const CustomerHome: React.FC = () => {
  const queryClient = useQueryClient();
  const [favouriteModal, setFavouriteModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [movie, setMovie] = useState<movieType | null>(null);
  const { data: movies, isLoading } = useQuery<movieType[]>(
    "movies",
    async () => {
      return await getAllMoviesForCustomer();
    }
  );
  const { data: favouriteMovies, isLoading: isFavouriteMoviesLoading } =
    useQuery<string[]>("favourite-movies", async () => {
      return await getFavouriteMoviesForCustomer();
    });

  const { mutateAsync: addToFavourite } = useMutation(addToFavouriteMovie, {
    onSuccess() {
      queryClient.invalidateQueries("favourite-movies");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
    },
  });

  const { mutateAsync: removeFromFavourite } = useMutation(
    removeFromFavouriteMovie,
    {
      onSuccess() {
        queryClient.invalidateQueries("favourite-movies");
      },
      onError(error) {
        const err = error as AxiosError;
        console.error(err);
      },
    }
  );

  const addOrRemoveMovie = (movie: movieType) => {
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

  return (
    <div>
      <div className="grid place-content-end">
        <button
          onClick={() => setFavouriteModal(true)}
          className={tailwindCssConstant.blueButton()}
        >
          <AiFillHeart className="w-3.5 h-3.5 mr-2" />
          Favourite Movies
        </button>
      </div>
      {isLoading && (
        <div className="grid  place-content-center mt-32">
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
                    className="w-full object-cover rounded-md"
                    src={movie.imgUrl}
                  />
                }
              >
                <div>
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
                      <span>{movie.description.slice(0, 130)}...</span>
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
                      <AiFillHeart size={18} className="text-white" />
                    </motion.div>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
      </section>
      <Modal
        title={<p className="font-bold">Upload Modal</p>}
        open={videoModal}
        onOk={closeVideoModal}
        onCancel={closeVideoModal}
        footer={null}
      >
        <YouTubePlayer videoId={`${movie?.srcUrl}`} />
      </Modal>
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
            <div className="grid  place-content-center mt-32">
              <Loader />
            </div>
          )}
          {/* show only favourite movies of the user */}
          {(!isLoading || !isFavouriteMoviesLoading) &&
            movies
              ?.filter((movie) => favouriteMovies?.includes(movie._id!))
              ?.map((movie) => {
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
              })}
        </div>
      </Modal>
    </div>
  );
};

export default CustomerHome;
