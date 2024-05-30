import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { URL_ALLPROPOSITION, URL_VALIDATION_COORDINATEUR, URL_VALIDATION_SECRETARIAT } from '../../utils/Api.js';

function ListNonValiderProposition() {
    // État pour stocker les données des propositions non validées
    const [propositions, setPropositions] = useState([]);
    // État pour stocker les données d'une proposition sélectionnée pour le modal
    const [selectedProposition, setSelectedProposition] = useState(null);
    // État pour contrôler l'affichage du modal
    const [showModal, setShowModal] = useState(false);
    // État pour empècher les étudiants d'afficher le modal
    const [isStudent, setIsStudent] = useState(false);

    // Fonction pour récupérer les propositions non validées depuis l'API
    const fetchNonValidePropositions = async () => {
        try {
            // Faites une requête à votre API pour récupérer les propositions non validées
            const response = await axios.get(URL_ALLPROPOSITION);
            // Mettez à jour l'état avec les données récupérées
            setPropositions(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des propositions non validées :", error);
        }
    };

    // Utilisez useEffect pour exécuter fetchNonValidePropositions une seule fois après le rendu initial du composant
    useEffect(() => {
        fetchNonValidePropositions();
    }, []);

    // Fonction pour ouvrir le modal et afficher les détails de la proposition sélectionnée
    const handleOpenModal = (proposition) => {
        setSelectedProposition(proposition);
        setShowModal(true);
    };

    const handleValidationCoordinateur = async (newValue) => {
        try {
            await axios.patch(`${URL_VALIDATION_COORDINATEUR}/${selectedProposition.id_proposition}`, { newValue });
            // Rafraîchir la liste des propositions après la validation
            fetchNonValidePropositions();
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de la validation de la proposition :", error);
        }
    };

    const handleValidationSecretariat = async (newValue) => {
        try {
            await axios.patch(`${URL_VALIDATION_SECRETARIAT}/${selectedProposition.id_proposition}`, { newValue });
            // Rafraîchir la liste des propositions après la validation
            fetchNonValidePropositions();
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de la validation de la proposition :", error);
        }
    };

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
        setIsStudent(!roles.includes('Secretariat') && !roles.includes('Coordinateurs'));
    }, [roles]);
    
    // Mise en page
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOM</th>
                        <th>Prénom</th>
                        <th>Objectif de stage</th>
                        <th>Validation Secrétariat</th>
                        <th>Validation Coordinateur</th>
                    </tr>
                </thead>
                <tbody>
                    {propositions.map((proposition) => (
                        <tr key={proposition.id_proposition} onClick={() => !isStudent && handleOpenModal(proposition)}>
                            <td>{proposition.id_proposition}</td>
                            <td>{proposition.nomEtudiant}</td>
                            <td>{proposition.prenomEtudiant}</td>
                            <td>{proposition.objectifStage}</td>
                            <td>{proposition.validationSecretariat}</td>
                            <td>{proposition.validationCoordinateur}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Proposition de stage de : {selectedProposition && `${selectedProposition.nomEtudiant}, ${selectedProposition.prenomEtudiant}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProposition && (
                        <>
                            <div><b>Année académique : </b>{selectedProposition.annee}</div>
                            <div><b>Quadrimestre : </b>{selectedProposition.quadrimestre}</div>
                            <br />
                            {/* Etudiant */}
                            <h4 style={{ color: '#007CBE' }}>Etudiant</h4>
                            <div><b>NOM : </b>{selectedProposition.nomEtudiant}</div>
                            <div><b>Prénom : </b>{selectedProposition.prenomEtudiant}</div>
                            <div><b>N° national belge : </b>{selectedProposition.nnationalEtudiant}</div>
                            <div><b>E-mail : </b>{selectedProposition.emailEtudiant}</div>
                            <div><b>Téléphone : </b>{selectedProposition.telephoneEtudiant}</div>
                            <br />
                            {/* Adresse officiel (sur la carte d'identité) */}
                            <h4 style={{ color: '#007CBE' }}>Adresse officiel (sur la carte d'identité)</h4>
                            <div><b>Rue : </b>{selectedProposition.rueOffi}</div>
                            <div><b>N° : </b>{selectedProposition.noffi}</div>
                            <div><b>Code Postal : </b>{selectedProposition.codePostalOffi}</div>
                            <div><b>Localité : </b>{selectedProposition.villeOffi}</div>
                            <br />
                            {/* Adresse de l’étudiant (durant le stage) */}
                            <h4 style={{ color: '#007CBE' }}>Adresse de l’étudiant (durant le stage)</h4>
                            <div><b>Rue : </b>{selectedProposition.rueStage}</div>
                            <div><b>N° : </b>{selectedProposition.nstage}</div>
                            <div><b>Code Postal : </b>{selectedProposition.codePostalStage}</div>
                            <div><b>Localité : </b>{selectedProposition.villeStage}</div>
                            <br />
                            {/* Coordonées du lieu de stage */}
                            <h4 style={{ color: '#007CBE' }}>Coordonées du lieu de stage</h4>
                            <div><b>Entreprise : </b>{selectedProposition.entreprise}</div>
                            <div><b>Rue : </b>{selectedProposition.rue}</div>
                            <div><b>N° : </b>{selectedProposition.n}</div>
                            <div><b>Code Postal : </b>{selectedProposition.codePostal}</div>
                            <div><b>Localité : </b>{selectedProposition.ville}</div>
                            <div><b>Téléphone : </b>{selectedProposition.telephone}</div>
                            <br />
                            {/* Chef du personnel */}
                            <h4 style={{ color: '#007CBE' }}>Chef du personnel</h4>
                            <div><b>NOM, Prénom : </b>{selectedProposition.chefPersonnel}</div>
                            <div><b>E-Mail : </b>{selectedProposition.emailChef}</div>
                            <div><b>Téléphone : </b>{selectedProposition.telephoneChef}</div>
                            <br />
                            {/* Maître de stage */}
                            <h4 style={{ color: '#007CBE' }}>Maître de stage</h4>
                            <div><b>NOM, Prénom : </b>{selectedProposition.maitreDeStage}</div>
                            <div><b>E-Mail : </b>{selectedProposition.emailMaitre}</div>
                            <div><b>Téléphone : </b>{selectedProposition.telephoneMaitre}</div>
                            <br />
                            <div><b>Objectif du stage : </b></div>
                            <div>{selectedProposition.objectifStage}</div>
                            <br />
                            <div><b>Télétravail : </b>{selectedProposition.teletravail}</div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {/* Afficher les boutons de validation du secrétariat uniquement si l'utilisateur a le rôle de secrétariat */}
                    {roles.includes('Secretariat') && (
                        <>
                            
                            <Button variant="success" onClick={() => handleValidationSecretariat('validé')}>Valider la proposition</Button>
                            <Button variant="danger" onClick={() => handleValidationSecretariat('rejeté')}>Refuser la proposition</Button>
                        </>
                    )}
                
                    {/* Afficher les boutons de validation du coordinateur uniquement si l'utilisateur a le rôle de coordinateur */}
                    {roles.includes('Coordinateurs') && (
                        <>
                            <Button variant="success" onClick={() => handleValidationCoordinateur('validé')}>Valider la proposition</Button>
                            <Button variant="danger" onClick={() => handleValidationCoordinateur('rejeté')}>Refuser la proposition</Button>
                        </>
                    )}
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ListNonValiderProposition;