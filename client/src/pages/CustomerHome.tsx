import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addToFavouriteMovie,
  getAllMoviesForCustomer,
  getFavouriteMoviesForCustomer,
  removeFromFavouriteMovie,
} from "../actions/customer";
import { movieType } from "../types";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Card, Tooltip } from "antd";
import Loader from "../components/Loader";
import { AxiosError } from "axios";

const { Meta } = Card;

const CustomerHome: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: movies, isLoading } = useQuery<movieType[]>(
    "movies",
    async () => {
      return await getAllMoviesForCustomer();
    }
  );
  const { data: favouriteMovies } = useQuery<string[]>(
    "favourite-movies",
    async () => {
      return await getFavouriteMoviesForCustomer();
    }
  );

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
  return (
    <div>
      {isLoading && (
        <div className="grid place-content-center mt-32">
          <Loader />
        </div>
      )}

      <section className="flex flex-wrap gap-12 my-9 ">
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
                    className="w-full h-full object-cover rounded-md"
                    src={movie.imgUrl}
                  />
                }
              >
                <div>
                  <Meta title={movie.title} />
                  <p className="pt-2">{movie.description.slice(0, 100)}...</p>
                </div>
                <div className="py-2 flex justify-between">
                  {/* <button
                    className="px-2 bg-red-500 text-white rounded-md"
                    onClick={() => openVideoModal(movie)}
                  >
                    Watch Video
                  </button> */}

                  <Tooltip title="Add To Favourite">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => addOrRemoveMovie(movie)}
                      className={`w-8 h-8 rounded-full ${
                        favouriteMovies?.includes(movie._id!)
                          ? "bg-red-600"
                          : "bg-green-600"
                      } flex items-center transition-all 100s ease-in-out justify-center cursor-pointer hover:shadow-md mt-2`}
                    >
                      <MdShoppingBasket className="text-white" />
                    </motion.div>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
      </section>
    </div>
  );
};

export default CustomerHome;
