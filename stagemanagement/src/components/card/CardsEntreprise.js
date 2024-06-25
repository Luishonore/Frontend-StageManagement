import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardFooter from 'react-bootstrap/esm/CardFooter';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import CoordoneForm from '../Form/CoordoneForm.js';
import NoteForm from '../Form/NoteForm.js';
import { URL_ALLSOCIETES, URL_ALLNOTE } from '../../utils/Api.js';
import pdfimg from '../../assets/images/file-pdf-solid-36.png';
import emailimg from '../../assets/images/envelope-regular-36.png';
import AddNote from '../buttons/AddNote.js';

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
                const societyNotes = notesData.filter((note) => note.idSociete === society.idSociete);
                return { ...society, notes: societyNotes };
            });
    
            setSocietes(mergedData);
        };
    
        fetchData();
    }, []);

    const [isStudent, setIsStudent] = useState(false);

    // Fonction pour récupérer les rôles de l'utilisateur 
    const getRolesFromToken = () => {
        if (!localStorage.getItem('token')) {
          return []; 
        }
    
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(atob(token.split('.')[1]));
    
        const roles = parsedToken.resource_access
          ? parsedToken.resource_access['stagemanagement-react'].roles || []
          : [];
        return roles;
    };
    useEffect(() => {
        const roles = getRolesFromToken();
        setIsStudent(roles.includes('Stagiaires'));
    }, []);

    // generation et téléchargement du fichier PDF
    const generatePDF = (society) => {
        const doc = new jsPDF();
        doc.text(20, 20, `Nom : ${society.nom}`);
        doc.text(20, 30, `Rue : ${society.rue}`);
        doc.text(20, 40, `N° : ${society.n}`);
        doc.text(20, 50, `Code postal : ${society.code_postal}`);
        doc.text(20, 60, `Ville : ${society.ville}`);
        doc.text(20, 70, `Téléphone : ${society.telephone}`);
        doc.text(20, 80, `E-mail : ${society.email}`);
        doc.text(20, 90, `Site web : ${society.url}`);
        doc.text(20, 100, `Secteur d'activité : ${society.activite}`);
        
        doc.text(20, 110, `Accueil : ${society.notes.reduce((acc, note) => acc + note.accueil, 0) / society.notes.length.toFixed(1)}`);
        doc.text(20, 120, `Charge : ${society.notes.reduce((acc, note) => acc + note.charge, 0) / society.notes.length.toFixed(1)}`);
        doc.text(20, 130, `Implication : ${society.notes.reduce((acc, note) => acc + note.implication, 0) / society.notes.length.toFixed(1)}`);
        doc.text(20, 140, `Lieu : ${society.notes.reduce((acc, note) => acc + note.lieu, 0) / society.notes.length.toFixed(1)}`);
        doc.save(`${society.nom}.pdf`);
    };

    // Mise en page
    return (
        <Row xs={1} md={1} className="g-1">
            {societes.map((society, idx) => (
                <Col key={idx}>
                    <Card className='cardform'> 
                         <Card.Header><b>{society.nom}</b></Card.Header>
                        <Card.Body className='cardsmoise'>
                            <div className='cardsgauche'>
                                <Card.Title>Coordonées :</Card.Title>
                                <CoordoneForm society={society} />
                            </div>
                            <div className='cardsdroite'>
                                <Card.Title>Notes moyennes ({society.notes.length} vote(s)):</Card.Title>
                                <NoteForm societyNotes={society.notes} />
                                {isStudent && <AddNote societyId={society.idSociete}/>}
                            </div>
                        </Card.Body>
                        <CardFooter>
                            <Button href={`mailto:${society.email}`} className='buttonmargin'>
                                <img alt="envoyer un E-mail" src={emailimg} />
                            </Button>
                            <Button variant="danger" onClick={() => generatePDF(society)} className='buttonmargin'>
                                <img alt="télécharger la fiche en pdf" src={pdfimg} />
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default CardsEntreprise;