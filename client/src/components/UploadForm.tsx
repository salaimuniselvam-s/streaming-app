import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import { movieType, planType } from "../types";
import { Select, notification } from "antd";
import { getAllPlans, uploadVideoToServer } from "../actions/admin";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Movie Title is required"),
  description: Yup.string().required("Description is required"),
  imgUrl: Yup.string().required("Image Url is required"),
  srcUrl: Yup.string().required("Source Url is required"),
  plans: Yup.array().required("Plan is required"),
});

const UploadForm = ({ closeModal }: { closeModal: () => void }) => {
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const { data: plans } = useQuery<planType[]>("plans", async () => {
    return await getAllPlans();
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const { isLoading, mutateAsync } = useMutation(uploadVideoToServer, {
    onSuccess() {
      openNotification(true, "Upload Successful");
      reset();
      closeModal();
      queryClient.invalidateQueries("movies");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      openNotification(false, "Upload Failed.. Please Try Again");
    },
  });
  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => mutateAsync(data as movieType))}
    >
      {contextHolder}
      <div className=" px-12 py-6 rounded-2xl ">
        <div>
          <label className="font-semibold">Movie Title</label>
          <input
            placeholder="Oppenheimer"
            className="border focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mt-3">
          <label className="font-semibold">Description</label>
          <textarea
            placeholder="Oppenheimer is a 2023 biographical thriller film written and directed by Christopher Nolan...."
            className="border mt-1 focus:outline-none border-gray-400 rounded-lg p-2 h-20 w-full"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="mt-3">
          <label className="font-semibold"> Add Video To Plans</label>
          <Controller
            name="plans"
            control={control}
            render={({ field }) => (
              <Select
                size="large"
                className="w-full border  rounded-lg border-gray-400 mt-1"
                {...field}
                mode="multiple"
              >
                {plans?.map((plan) => (
                  <Select.Option value={plan.title} key={plan._id}>
                    {plan.title} - {plan.price}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <p className="mx-2 text-red-600">{errors.plans?.message}</p>
        </div>
        <div className="mt-3">
          <label className="font-semibold">Image Url</label>
          <input
            placeholder="https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg"
            className="border focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
            {...register("imgUrl")}
          />
          {errors.imgUrl && (
            <p className="text-red-500">{errors.imgUrl.message}</p>
          )}
        </div>
        <div className="mt-3">
          <label className="font-semibold">Video Url</label>
          <input
            placeholder="https://www.youtube.com/watch?v=uYPbbksJxIg"
            className="border focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
            {...register("srcUrl")}
          />
          {errors.srcUrl && (
            <p className="text-red-500">{errors.srcUrl.message}</p>
          )}
        </div>

        <button className="bg-blue-500 mt-3 w-full hover:bg-blue-700 text-white p-2 rounded-lg">
          {isLoading ? <Loader /> : "Upload Video"}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
