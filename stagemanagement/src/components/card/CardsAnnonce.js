import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardFooter from 'react-bootstrap/esm/CardFooter';
import Button from 'react-bootstrap/Button';
import { URL_ALLANNONCE, URL_ALLSOCIETES } from '../../utils/Api.js';
import CoordoneAnnonceForm from '../Form/CoordoneAnnonceForm.js';
import AnnonceForm from '../Form/AnnonceForm.js';
import pdfimg from '../../assets/images/file-pdf-solid-36.png';
import jsPDF from 'jspdf';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

const CardsAnnonce = () => {
    const [annonces, setAnnonces] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedAnnonce, setSelectedAnnonce] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const annoncesResponse = await axios.get(URL_ALLANNONCE);
            const coordonesResponse = await axios.get(URL_ALLSOCIETES);

            const annoncesData = annoncesResponse.data;
            const coordonesData = coordonesResponse.data;

            // Fusionner les données
            const mergedData = annoncesData.map((annonce) => {
                const annonceCoordones = coordonesData.find((coordone) => coordone.idSociete === annonce.idSociete);
                return { ...annonce, coordones: annonceCoordones };
            });

            setAnnonces(mergedData);
        };

        fetchData();
    }, []);

    const generatePDF = (annonce) => {
        const doc = new jsPDF();
        doc.text(20, 20, `Nom : ${annonce.coordones.nom}`);
        doc.text(20, 30, `Rue : ${annonce.coordones.rue}`);
        doc.text(20, 40, `N° : ${annonce.coordones.n}`);
        doc.text(20, 50, `Code postal : ${annonce.coordones.code_postal}`);
        doc.text(20, 60, `Ville : ${annonce.coordones.ville}`);
        doc.text(20, 70, `Téléphone : ${annonce.coordones.telephone}`);
        doc.text(20, 80, `E-mail : ${annonce.coordones.email}`);
        doc.text(20, 90, `Site web : ${annonce.coordones.url}`);
        doc.text(20, 100, `Secteur d'activité : ${annonce.coordones.activite}`);

        doc.text(20, 110, `Description de l'offre : ${annonce.description}`);
        doc.text(20, 120, `Contact : ${annonce.nomContact}, ${annonce.prenomContact}`);
        doc.text(20, 130, `E-mail de contact : ${annonce.emailContact}`);
        doc.text(20, 140, `Téléphone de contact : ${annonce.telephoneContact}`);
        doc.save(`${annonce.coordones.nom}-annonce.pdf`);
    };

    const handleShow = (annonce) => {
        setSelectedAnnonce(annonce);
        setShow(true);
    };

    const handleClose = () => {
        setSelectedAnnonce(null);
        setShow(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${URL_ALLANNONCE}/${selectedAnnonce.idAnnonce}`);
            setAnnonces(annonces.filter((annonce) => annonce.idAnnonce !== selectedAnnonce.idAnnonce));
            handleClose();
        } catch (error) {
            console.error("There was an error deleting the annonce!", error);
        }
    };


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
            <Row xs={1} md={1} className="g-1">
                {annonces.map((annonce, idx) => (
                    <Col key={idx}>
                        <Card className='cardform'>
                            <Card.Header className='close'>
                                <b>{annonce.coordones.nom}</b>
                                {!isStudent &&<CloseButton onClick={() => handleShow(annonce)} />}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{selectedAnnonce && selectedAnnonce.coordones.nom}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Êtes-vous sûr de vouloir supprimer cette annonce ?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Annuler
                                        </Button>
                                        <Button variant="danger" onClick={handleDelete}>
                                            Confirmer la suppression
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card.Header>
                            <Card.Body className='cardsmoise'>
                                <div className='cardsgauche'>
                                    <Card.Title>Description de l'offre : </Card.Title>
                                    <AnnonceForm annonce={annonce} />
                                </div>
                                <div className='cardsdroite'>
                                    <Card.Title>Coordonées : </Card.Title>
                                    <CoordoneAnnonceForm annonceCoordones={annonce.coordones} />
                                </div>
                            </Card.Body>
                            <CardFooter className='cardsmoise'>
                                <div className='cardsgauche'><b>Date de publication : </b>{annonce.date.slice(0, 10)}</div>
                                <div className='cardsdroite'><b>Tag : </b>{annonce.tagSection}</div>
                                <Button variant="danger" onClick={() => generatePDF(annonce)}>
                                    <img alt="pdf" src={pdfimg} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default CardsAnnonce;