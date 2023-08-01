import React, { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineUsergroupAdd, AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Popconfirm, Select, Tooltip, notification } from "antd";
import Loader from "./Loader";
import {
  addFriendToFriendsGroup,
  getAllCustomers,
  getAllFriendsForCustomer,
  removeFriendFromFriendsGroup,
} from "../actions/customer";
import { getUserDetails } from "../utils/cookies";
import { tailwindCssConstant } from "../utils/css";
import { AxiosError } from "axios";

const FriendsGroup: React.FC = () => {
  const queryClient = useQueryClient();
  const [newFriend, setNewFriend] = React.useState<string>("");
  const [deleteFriend, setDeleteFriend] = React.useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const username = getUserDetails().username;

  // get all customers in the streaming app except admin users
  const { data: customers, isLoading: isCustomerLoading } = useQuery<string[]>(
    "all-customers",
    async () => {
      return await getAllCustomers();
    }
  );

  // get all friends for the customer
  const { data: friends, isLoading } = useQuery<string[]>(
    "friends",
    async () => {
      return await getAllFriendsForCustomer(username);
    }
  );

  const openNotification = (addFriendSuccess: boolean, message: string) => {
    if (addFriendSuccess) {
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

  // add friend to the friends group
  const { mutateAsync: addFriend } = useMutation(
    () => addFriendToFriendsGroup(username, [newFriend]),
    {
      onSuccess() {
        openNotification(true, "Friend Added Successfully");
        queryClient.invalidateQueries("friends");
        setNewFriend("");
      },
      onError(error) {
        const err = error as AxiosError;
        console.error(err);
        openNotification(false, "Adding Friend Failed.. Please Try Again");
      },
    }
  );

  // remove friend from the friends group
  const { mutateAsync: removeFriend } = useMutation(
    () => removeFriendFromFriendsGroup(username, deleteFriend),
    {
      onSuccess() {
        openNotification(true, "Friend Removed Successfully");
        queryClient.invalidateQueries("friends");
        setDeleteFriend("");
      },
      onError(error) {
        const err = error as AxiosError;
        console.error(err);
        openNotification(false, "Removing Friend Failed.. Please Try Again");
      },
    }
  );

  useEffect(() => {
    if (deleteFriend) removeFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteFriend]);

  return (
    <div>
      {contextHolder}
      <div>
        <div className=" border border-gray-400 shadow rounded-lg px-4 mt-3 py-3">
          <h1 className="font-semibold flex items-center mb-4 text-lg">
            <FaUserFriends className="w-3.5 h-3.5 mr-2" />
            Your Friends
          </h1>
          {isLoading && (
            <div className="grid  place-content-center my-6">
              <Loader />
            </div>
          )}
          {!isLoading &&
            (friends?.length === 0 ? (
              <div className="text-center my-6 text-xl font-semibold">
                No Friends Found..
              </div>
            ) : (
              friends?.map((friend) => {
                return (
                  <div
                    key={friend}
                    className="flex font-semibold items-center justify-between border border-gray-300 shadow text-lg rounded-lg px-3 py-1 mb-2"
                  >
                    <h1 className="capitalize">{friend}</h1>
                    <Tooltip
                      placement="bottom"
                      title="Remove Friend From Friends Group"
                    >
                      <Popconfirm
                        title="Remove Friend"
                        description={
                          <p>
                            Are you sure to Remove
                            {
                              <span className="capitalize font-semibold mx-1">
                                {friend}
                              </span>
                            }{" "}
                            from friends group ?
                          </p>
                        }
                        onConfirm={() => {
                          setDeleteFriend(friend);
                        }}
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
                  </div>
                );
              })
            ))}
        </div>
        <div className="border border-gray-400 shadow rounded-lg px-4 mt-3 py-3">
          <h1 className="font-semibold flex items-center mb-4 text-lg">
            <AiOutlineUsergroupAdd className="w-3.5 h-3.5 mr-2" />
            Add New Friend
          </h1>
          {isCustomerLoading ? (
            <div className="grid  place-content-center my-6">
              <Loader />
            </div>
          ) : (
            <>
              <Select
                size="large"
                value={newFriend}
                notFoundContent={
                  <p className="p-2 font-bold">No Users Found</p>
                }
                onChange={(e) => setNewFriend(e)}
                className="w-full border  rounded-lg border-gray-400 mt-1"
              >
                {customers
                  ?.filter((data) => !friends?.includes(data))
                  ?.map((user) => (
                    <Select.Option
                      className="capitalize font-semibold text-xl"
                      value={user}
                      key={user}
                    >
                      {user}
                    </Select.Option>
                  ))}
              </Select>

              <button
                onClick={() => addFriend()}
                className={`${tailwindCssConstant.blueButton()} mt-2 w-full flex justify-center`}
              >
                Add Friend To Group
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsGroup;
