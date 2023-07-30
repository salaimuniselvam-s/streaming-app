import { Modal } from "antd";
import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import UploadForm from "./UploadForm";
import PlanDetails from "./PlanDetails";
import { tailwindCssConstant } from "../utils/css";

const AdminControls: React.FC = () => {
  const [isUploadModal, setUploadModal] = useState(false);
  const [isPlanModal, setPlanModal] = useState(false);

  const closeUploadModal = () => setUploadModal(false);

  const closePlanModal = () => setPlanModal(false);

  return (
    <div className="flex justify-end gap-6">
      <button
        className={tailwindCssConstant.blueButton()}
        onClick={() => setUploadModal(true)}
      >
        <BsUpload className="w-3.5 h-3.5 mr-2" />
        Upload Video
      </button>

      <button
        onClick={() => setPlanModal(true)}
        type="button"
        className={tailwindCssConstant.blueButton()}
      >
        <RxUpdate className="w-3.5 h-3.5 mr-2 " />
        Update plan
      </button>

      <Modal
        title={
          <p className="font-bold text-lg flex items-center">
            <BsUpload className="w-3.5 h-3.5 mr-2" />
            Upload A New Video
          </p>
        }
        open={isUploadModal}
        onOk={closeUploadModal}
        onCancel={closeUploadModal}
        footer={null}
      >
        <UploadForm closeModal={closeUploadModal} />
      </Modal>

      <Modal
        title={
          <p className="font-bold text-lg flex items-center">
            <RxUpdate className="w-3.5 h-3.5 mr-2" />
            Plan Details
          </p>
        }
        open={isPlanModal}
        onOk={closePlanModal}
        onCancel={closePlanModal}
        footer={null}
      >
        <PlanDetails />
      </Modal>
    </div>
  );
};

export default AdminControls;
