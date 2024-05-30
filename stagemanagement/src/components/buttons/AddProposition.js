import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormProposition from '../Formulaire/FormProposition';

function AddProposition() {
    // Affichage conditionnel
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Mise en page
    return (
        <>
            <Button variant="secondary" className='flexbouton' onClick={handleShow}>
                + faire une proposition de stage
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle proposition de stage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormProposition />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddProposition;