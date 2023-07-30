import React from "react";
import { addNewPlan, getAllPlans } from "../actions/admin";
import { GoChecklist } from "react-icons/go";
import { RiPlayListAddLine } from "react-icons/ri";
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

  return (
    <div>
      {contextHolder}
      <div>
        <div className=" border border-gray-400 shadow rounded-lg px-4 mt-3 py-3">
          <h1 className="font-semibold flex items-center mb-4 text-lg">
            <GoChecklist className="w-3.5 h-3.5 mr-2" />
            Existing Plans
          </h1>
          {plans?.map((plan) => {
            return (
              <div
                key={plan._id}
                className="flex font-semibold items-center justify-between border border-gray-300 shadow text-lg rounded-lg px-3 py-1 mb-2"
              >
                <h1 className="capitalize">{plan.title}</h1>
                <h3 className="bg-specialPrice my-1 px-3 rounded-lg py-1 text-white text-base">
                  &#x20B9; {plan.price}
                </h3>
              </div>
            );
          })}
        </div>
        <div className="border border-gray-400 shadow rounded-lg px-4 mt-3 py-3">
          <h1 className="font-semibold flex items-center mb-4 text-lg">
            <RiPlayListAddLine className="w-3.5 h-3.5 mr-2" />
            Add New Plan
          </h1>
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit((data) => addPlan(data as planType))}
          >
            <input
              placeholder="Enter New Plan Name"
              className="border font-semibold focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <input
              placeholder="Enter Price for the Plan"
              type="number"
              className="border font-semibold focus:outline-none border-gray-400 mt-1  rounded-lg p-2 w-full"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
            <button className="bg-blue-500 mt-2 w-full hover:bg-blue-700 text-white p-2 rounded-lg">
              {isLoading ? <Loader /> : "Add New Plan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
