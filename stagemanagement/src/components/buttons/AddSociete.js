import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FormSociete from '../Formulaire/FormSociete';

function AddSociete( {setShowSocieteForm} ) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    // Mise en page
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={() =>setShowSocieteForm(false)}>
                    <Modal.Title>Nouvelle Société</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSociete />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddSociete;