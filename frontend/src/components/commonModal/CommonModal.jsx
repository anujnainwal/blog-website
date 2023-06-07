import { Modal } from "antd";
import React from "react";

const CommonModal = ({title,onClose,openModal,children}) => {
  return (
    <React.Fragment>
     
      <Modal
        title={title}
        open={openModal}
        // onOk={this.handleOk}
        onCancel={onClose}
      >
       {
        children
       }
      </Modal>
    </React.Fragment>
  );
};

export default CommonModal;
