import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardFooter from 'react-bootstrap/esm/CardFooter';
import { URL_ALLANNONCE, URL_ALLSOCIETES } from '../../utils/Api.js';
import CoordoneAnnonceForm from '../Form/CoordoneAnnonceForm.js';
import AnnonceForm from '../Form/AnnonceForm.js';

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

    // Mise en page
    return (
        <>
            <Row xs={1} md={1} className="g-1">
                {annonces.map((annonce, idx) => (
                    <Col key={idx}>
                        <Card className='cardform'> 
                            <Card.Header>{annonce.coordones.nom}</Card.Header>
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
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default CardsAnnonce;