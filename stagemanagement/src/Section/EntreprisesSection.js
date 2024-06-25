import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsEntreprise from '../components/card/CardsEntreprise';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormSociete from '../components/Formulaire/FormSociete';

const EntreprisesSection = () => {
    // Affichage conditionnel
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [isStudent, setIsStudent] = useState(false);

    // Fonction pour récupérer les rôles de l'utilisateur 
    const getRolesFromToken = () => {
        // Check if token is available in localStorage
        if (!localStorage.getItem('token')) {
          return []; // Return an empty array if no token
        }
    
        // Parse the JWT token
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(atob(token.split('.')[1])); // Base64 decode the second part (payload)
    
        // Extract roles from 'resource_access' claim for your specific client ID
        const roles = parsedToken.resource_access
          ? parsedToken.resource_access['stagemanagement-react'].roles || []
          : []; // Use your client ID if it's different
    
        return roles;
      };
      const roles = getRolesFromToken();

      useEffect(() => {
        setIsStudent(!roles.includes('Superviseur') && !roles.includes('Coordinateurs'));
    }, [roles]);

    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Entreprises</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                
            {!isStudent &&<Button variant="danger" className='flexbouton' onClick={handleShow}>+ Ajouter une Société</Button>}

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Nouvelle Société</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSociete />
                </Modal.Body>
            </Modal>

                <CardsEntreprise />
            </section>
        </>
    );
    
}

export default EntreprisesSection;