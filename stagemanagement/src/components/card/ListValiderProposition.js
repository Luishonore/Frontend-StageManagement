import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { URL_ALLPROPOSITION_VALIDER } from '../../utils/Api.js'

function ListValiderProposition() {
    const [propositions, setPropositions] = useState([]);
    const [selectedProposition, setSelectedProposition] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchValidePropositions = async () => {
        try {
            const response = await axios.get(URL_ALLPROPOSITION_VALIDER);
            setPropositions(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des propositions validées :", error);
        }
    };

    useEffect(() => {
        fetchValidePropositions();
    }, []);

    const handleOpenModal = (proposition) => {
        setSelectedProposition(proposition);
        setShowModal(true);
    };

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOM</th>
                        <th>Prénom</th>
                        <th>Objectif de stage</th>
                    </tr>
                </thead>
                <tbody>
                    {propositions.map((proposition) => (
                        <tr key={proposition.id_proposition} onClick={() => handleOpenModal(proposition)}>
                            <td>{proposition.id_proposition}</td>
                            <td>{proposition.nomEtudiant}</td>
                            <td>{proposition.prenomEtudiant}</td>
                            <td>{proposition.objectifStage}</td>
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
                            <div><b>Objectif du stage : </b>{selectedProposition.objectifStage}</div>
                            <br />
                            <div><b>Télétravail : </b>{selectedProposition.teletravail}</div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ListValiderProposition;