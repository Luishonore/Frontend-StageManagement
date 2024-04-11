import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormAnnonce from '../Formulaire/FormAnnonce';

function AddAnnonce() {
  // Affichage conditionnel
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Mise en page
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        + Ajouter une annonce
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle annonce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAnnonce />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddAnnonce;