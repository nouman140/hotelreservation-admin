import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteModal = ({ modal, title, deleteFunction, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete {title}</ModalHeader>
      <ModalBody>Are you sure you want to remove {title} ?</ModalBody>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={toggle}>
          Cancel
        </Button>
        <Button color="danger" size="sm" onClick={deleteFunction}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
