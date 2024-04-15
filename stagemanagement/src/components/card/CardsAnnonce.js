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

const CardsAnnonce = () => {
    const [annonces, setAnnonces] = useState([]);
      
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

    // generation et téléchargement du fichier PDF
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

    // Mise en page
    return (
        <>
            <Row xs={1} md={1} className="g-1">
                {annonces.map((annonce, idx) => (
                    <Col key={idx}>
                        <Card className='cardform'> 
                            <Card.Header><b>{annonce.coordones.nom}</b></Card.Header>
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