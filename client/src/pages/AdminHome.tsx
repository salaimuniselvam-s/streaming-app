import { useMutation, useQuery, useQueryClient } from "react-query";
import AdminControls from "../components/AdminControls";
import {
  deleteMovieById,
  getAllMovies,
  getAllPlans,
  updatePlansByMovieId,
} from "../actions/admin";
import React, { useState } from "react";
import { AiFillYoutube, AiOutlineDelete } from "react-icons/ai";
import { BiEdit, BiMoviePlay } from "react-icons/bi";
import { motion } from "framer-motion";
import { Card, Modal, Popconfirm, Select, Tooltip, notification } from "antd";
import { movieType, planType } from "../types";
import Loader from "../components/Loader";
import YouTubePlayer from "../components/YoutubePlayer";
import { AxiosError } from "axios";
import { tailwindCssConstant } from "../utils/css";

const { Meta } = Card;

const AdminHome: React.FC = () => {
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const [videoModal, setVideoModal] = useState(false);
  const [movie, setMovie] = useState<movieType | null>(null);
  const [planModal, setPlanModal] = useState(false);
  const [updatePlans, setUpdatePlans] = useState<string[]>([]);

  const { data: movies, isLoading } = useQuery<movieType[]>(
    "movies",
    async () => {
      return await getAllMovies();
    }
  );

  const openNotification = (uploadSuccess: boolean, message: string) => {
    if (uploadSuccess) {
      api.success({
        message,
        placement: "topRight",
        duration: 2,
      });
    } else {
      api.error({
        message,
        placement: "topRight",
        duration: 2,
      });
    }
  };

  const { mutateAsync: updatePlan } = useMutation(
    () => updatePlansByMovieId(`${movie?._id}`, updatePlans),
    {
      onSuccess() {
        queryClient.invalidateQueries("movies");
        openNotification(true, `Plan Updated Successfully.`);
      },
      onError(error) {
        const err = error as AxiosError;
        openNotification(false, `Updating Plan Failed.Please Try Again.`);
        console.error(err);
      },
    }
  );

  const { mutateAsync: deleteMovie } = useMutation(deleteMovieById, {
    onSuccess() {
      queryClient.invalidateQueries("movies");
      openNotification(true, `Deleted Successfully.`);
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      openNotification(false, `Deletion Failed.Please try again..`);
    },
  });

  const openVideoModal = (movie: movieType) => {
    setMovie(movie);
    setVideoModal(true);
  };
  const closeVideoModal = () => setVideoModal(false);

  const openPlanModal = (movie: movieType) => {
    setUpdatePlans(movie.plans);
    setPlanModal(true);
    setMovie(movie);
  };

  const closePlanModal = () => setPlanModal(false);

  const updatePlanValues = (plans: string[]) => {
    setUpdatePlans(plans);
  };

  const confirmPlanModal = () => {
    updatePlan();
    setPlanModal(false);
  };

  const onDeleteMovie = (id: string) => {
    deleteMovie(id);
  };

  return (
    <div>
      {contextHolder}
      {/* for showing the actions managed by the admin */}
      <AdminControls />

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
                    className="w-full h-60 object-center object-cover rounded-md"
                    src={movie.imgUrl}
                  />
                }
              >
                <div className="min-h-100">
                  <Meta
                    className="capitalize text-lg font-semibold"
                    title={
                      <p className="flex justify-between items-center">
                        {movie.title}
                        <Tooltip placement="bottom" title="Delete Movie">
                          <Popconfirm
                            title="Delete Movie"
                            description={
                              <p>
                                Are you sure to delete
                                {
                                  <span className="capitalize font-semibold ml-1">
                                    {movie.title}
                                  </span>
                                }
                                ?
                              </p>
                            }
                            onConfirm={() => onDeleteMovie(movie._id!)}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                          >
                            <AiOutlineDelete
                              size={18}
                              className="text-red-600 ml-2 cursor-pointer"
                            />
                          </Popconfirm>
                        </Tooltip>
                      </p>
                    }
                  />
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
                <div>
                  <h3 className="mt-2 font-semibold sm:text-base">Plans</h3>
                  <p className="min-h-48 max-h-12 overflow-y-auto">
                    {movie.plans.map((plan) => (
                      <span
                        key={plan}
                        className="inline-flex items-center mr-2 my-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize"
                      >
                        {plan}
                      </span>
                    ))}
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

                  <Tooltip title="Add or Remove Movies From Plans">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => openPlanModal(movie)}
                      className={`w-10 h-10 rounded-full bg-green-600
                       flex items-center transition-all 100s ease-in-out justify-center cursor-pointer hover:shadow-md`}
                    >
                      <BiEdit size={18} className="text-white" />
                    </motion.div>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
      </section>
      <Modal
        title={
          <p className="font-bold text-2xl capitalize mb-3 flex  items-center">
            <BiMoviePlay className="mr-1" />
            {movie?.title}
          </p>
        }
        open={videoModal}
        onOk={closeVideoModal}
        onCancel={closeVideoModal}
        footer={null}
        destroyOnClose={true}
      >
        <YouTubePlayer videoId={`${movie?.srcUrl}`} />
      </Modal>

      <Modal
        title={
          <p className="font-bold flex items-center gap-2">
            <BiEdit size={18} />
            Add/Remove Movies From Plans
          </p>
        }
        open={planModal}
        onOk={confirmPlanModal}
        onCancel={closePlanModal}
      >
        <PlanSelected
          updatePlans={updatePlans}
          setUpdatePlans={updatePlanValues}
        />
      </Modal>
    </div>
  );
};

const PlanSelected = ({
  updatePlans,
  setUpdatePlans,
}: {
  updatePlans: string[];
  setUpdatePlans: (plans: string[]) => void;
}) => {
  const { data: plans } = useQuery<planType[]>("plans", async () => {
    return await getAllPlans();
  });

  return (
    <div>
      <Select
        className="border z-10 rounded-lg border-gray-200 w-full my-6"
        size="large"
        mode="multiple"
        onChange={(e) => setUpdatePlans(e)}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        value={updatePlans}
      >
        {plans?.map((p) => (
          <Select.Option value={p.title} key={p._id}>
            {p.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default AdminHome;
