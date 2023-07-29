import { Modal } from "antd";
import React, { useState } from "react";
import UploadForm from "./UploadForm";
import PlanDetails from "./PlanDetails";

const AdminControls: React.FC = () => {
  const [isUploadModal, setUploadModal] = useState(false);
  const [isPlanModal, setPlanModal] = useState(false);

  const closeUploadModal = () => setUploadModal(false);

  const closePlanModal = () => setPlanModal(false);

  return (
    <div className="flex justify-end gap-12">
      <button onClick={() => setUploadModal(true)}>Upload Video</button>

      <button onClick={() => setPlanModal(true)}>Update Plan</button>

      <Modal
        title="Upload Videos"
        open={isUploadModal}
        onOk={closeUploadModal}
        onCancel={closeUploadModal}
        footer={null}
      >
        <UploadForm closeModal={closeUploadModal} />
      </Modal>

      <Modal
        title="Plan Details"
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
