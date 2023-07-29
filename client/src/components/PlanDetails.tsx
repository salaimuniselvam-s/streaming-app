import React from "react";
import { addNewPlan, getAllPlans, removePlan } from "../actions/admin";
import { planType } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { notification } from "antd";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("User Name is required"),
  price: Yup.number().required("Price is required"),
});

const PlanDetails: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [api, contextHolder] = notification.useNotification();
  const { data: plans, isLoading } = useQuery<planType[]>("plans", async () => {
    return await getAllPlans();
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

  const { mutateAsync: addPlan } = useMutation(addNewPlan, {
    onSuccess() {
      openNotification(true, "Plan Updated Successfully");
      reset();
      queryClient.invalidateQueries("plans");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      openNotification(false, "Plan Update Failed.. Please Try Again");
    },
  });

  const { mutateAsync: deletePlan } = useMutation(removePlan, {
    onSuccess() {
      openNotification(true, "Plan Deleted Successfully");
      queryClient.invalidateQueries("plans");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      openNotification(false, "Plan Deletion Failed.. Please Try Again");
    },
  });
  return (
    <div>
      {contextHolder}
      <div>
        Existing Plans
        <div>
          {plans?.map((plan) => {
            return (
              <div>
                <h1>{plan.title}</h1>
                <h3>{plan.price}</h3>
                <button onClick={() => deletePlan(`${plan._id}`)}>
                  delete plan
                </button>
              </div>
            );
          })}
        </div>
        <div>Add New Plan</div>
        <form
          className="w-full grid place-content-center"
          onSubmit={handleSubmit((data) => addPlan(data as planType))}
        >
          <input
            placeholder="Enter New Plan Name"
            className="border focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <input
            placeholder="Enter Price for the Plan"
            type="number"
            className="border focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
          <button className="bg-blue-500 mt-2 w-full hover:bg-blue-700 text-white p-2 rounded-lg">
            {isLoading ? <Loader /> : "Add Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanDetails;
