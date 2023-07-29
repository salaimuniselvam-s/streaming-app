import { useMutation, useQuery, useQueryClient } from "react-query";
import AdminControls from "../components/AdminControls";
import {
  getAllMovies,
  getAllPlans,
  updatePlansByMovieId,
} from "../actions/admin";
import React, { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Card, Modal, Select, Tooltip } from "antd";
import { movieType, planType } from "../types";
import Loader from "../components/Loader";
import YouTubePlayer from "../components/YoutubePlayer";
import { AxiosError } from "axios";

const { Meta } = Card;

const Home: React.FC = () => {
  const queryClient = useQueryClient();
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
  const { mutateAsync: updatePlan } = useMutation(
    () => updatePlansByMovieId(`${movie?._id}`, updatePlans),
    {
      onSuccess() {
        queryClient.invalidateQueries("movies");
      },
      onError(error) {
        const err = error as AxiosError;
        console.error(err);
      },
    }
  );

  const openVideoModal = (movie: movieType) => {
    setMovie(movie);
    setVideoModal(true);
  };
  const closeVideoModal = () => setVideoModal(false);

  const closePlanModal = () => setPlanModal(false);

  const openPlanModal = (movie: movieType) => {
    setUpdatePlans(movie.plans);
    setPlanModal(true);
    setMovie(movie);
  };

  const updatePlanValues = (plans: string[]) => {
    setUpdatePlans(plans);
  };

  const confirmPlanModal = () => {
    updatePlan();
    setPlanModal(false);
  };

  return (
    <div>
      <AdminControls />

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
                  <button
                    className="px-2 bg-red-500 text-white rounded-md"
                    onClick={() => openVideoModal(movie)}
                  >
                    Watch Video
                  </button>

                  <Tooltip title="Modify Plan">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => openPlanModal(movie)}
                      className={`w-8 h-8 rounded-full ${
                        isLoading ? "bg-red-600" : "bg-green-600"
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
      <Modal
        title="Upload Modal"
        open={videoModal}
        onOk={closeVideoModal}
        onCancel={closeVideoModal}
        footer={null}
      >
        <YouTubePlayer videoId={`${movie?.srcUrl}`} />
      </Modal>

      <Modal
        title="Modify Plan Modal"
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
        className="border z-10 w-full  m-2 p-2 rounded-lg border-black"
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

export default Home;
