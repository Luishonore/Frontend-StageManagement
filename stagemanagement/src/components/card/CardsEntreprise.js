import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardFooter from 'react-bootstrap/esm/CardFooter';
import CoordoneForm from './CoordoneForm';
import NoteForm from './NoteForm';
import { URL_ALLSOCIETES, URL_ALLNOTE } from '../../utils/Api.js';

const CardsEntreprise = () => {
    const [societes, setSocietes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const societesResponse = await axios.get(URL_ALLSOCIETES);
          const notesResponse = await axios.get(URL_ALLNOTE);
    
          const societesData = societesResponse.data;
          const notesData = notesResponse.data;
    
          // Fusionner les données
          const mergedData = societesData.map((society) => {
            const societyNotes = notesData.filter((note) => note.idSociete === society.id);
            return { ...society, notes: societyNotes };
          });
    
          setSocietes(mergedData);
        };
    
        fetchData();
      }, []);


    // Mise en page
    return (
        <Row xs={1} md={1} className="g-1">
            {societes.map((society, idx) => (
                <Col key={idx}>
                    <Card className='cardform'> 
                         <Card.Header>{society.nom}</Card.Header>
                        <Card.Body className='cardsmoise'>
                            <div className='cardsgauche'>
                                <Card.Title>Coordonées :</Card.Title>
                                <CoordoneForm society={society} />
                            </div>
                            <div className='cardsdroite'>
                                <Card.Title>Notes moyennes ({society.notes.length}):</Card.Title>
                                <NoteForm societyNotes={society.notes} />
                            </div>
                        </Card.Body>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default CardsEntreprise;