import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { URL_ALLPROPOSITION } from '../../utils/Api';

function FormProposition() {
    // Année académique automatique
    const [newAnnee, setAnnee] = useState('');
    const updateAnneeAutomatique = () => {
        const date = new Date();
        const anneeActuelle = date.getFullYear();
        const moisActuel = date.getMonth();
        const anneeDebut = moisActuel >= 8 ? anneeActuelle : anneeActuelle - 1;
        const anneeFin = anneeDebut + 1;
        const anneeAcademique = `${anneeDebut}/${anneeFin}`;
        setAnnee(anneeAcademique);
    };
    useEffect(() => {
        updateAnneeAutomatique();
    }, []);

    // Données du formulaire
    const [formData, setFormData] = useState({
        objectifStage: "",
        teletravail: "",
        quadrimestre: "",
        annee: "",

        nomEtudiant: "",
        prenomEtudiant: "",
        emailEtudiant: "",
        telephoneEtudiant: "",
        nNationalEtudiant: "",
        
        rueOffi: "",
        nOffi: "",
        codePostalOffi: "",
        villeOffi: "",

        rueStage: "",
        nStage: "",
        codePostalStage: "",
        villeStage: "",

        entreprise: "",
        rue: "",
        n: "",
        codePostal: "",
        ville: "",
        telephone: "",

        chefPersonnel: "",
        emailChef: "",
        telephoneChef: "",

        maitreDeStage: "",
        emailMaitre: "",
        telephoneMaitre: "",
    });

    // Gestion du formulaire des propositions
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
        const data = {
            objectifStage: formData.objectifStage,
            teletravail: formData.teletravail,
            quadrimestre: formData.quadrimestre,
            annee: newAnnee,

            nomEtudiant: formData.nomEtudiant,
            prenomEtudiant: formData.prenomEtudiant,
            emailEtudiant: formData.emailEtudiant,
            telephoneEtudiant: formData.telephoneEtudiant,
            nNationalEtudiant: formData.nNationalEtudiant,
            
            rueOffi: formData.rueOffi,
            nOffi: formData.nOffi,
            codePostalOffi: formData.codePostalOffi,
            villeOffi: formData.villeOffi,

            rueStage: formData.rueStage,
            nStage: formData.nStage,
            codePostalStage: formData.codePostalStage,
            villeStage: formData.villeStage,

            entreprise: formData.entreprise,
            rue: formData.rue,
            n: formData.n,
            codePostal: formData.codePostal,
            ville: formData.ville,
            telephone: formData.telephone,

            chefPersonnel: formData.chefPersonnel,
            emailChef: formData.emailChef,
            telephoneChef: formData.telephone,

            maitreDeStage: formData.maitreDeStage,
            emailMaitre: formData.emailMaitre,
            telephoneMaitre: formData.telephoneMaitre,
        };

        // Envoyer les données à l'API
        try {
            const response = await axios.post(URL_ALLPROPOSITION, data);
            console.log(response.data); // Affiche la réponse de l'API
            // Gérer le succès de l'envoi
            alert("Votre proposition a été créée avec succès !");
        } 
        catch (error) {
            console.error("Erreur lors de l'envoi de la proposition:", error);
            // Gérer l'erreur de l'envoi
            alert("Une erreur est survenue lors de la création de la proposition.");
        } 
    };

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Mise en page
    return(
        <Form onSubmit={handleSubmit}>
            {/* === DOCUMENT === */}
            <Form.Group className="mb-3">
                <Form.Label>Année académique</Form.Label>
                <Form.Control disabled type="text" name="annee" value={newAnnee} onChange={(e) => setAnnee(e.target.value)}/>
            </Form.Group>

            <Form.Label>Quadrimestre</Form.Label>
            <Form.Select className="mb-3" aria-label="Quadrimestre" name="quadrimestre" value={formData.quadrimestre} onChange={handleChange}>
                <option>Choisisez le quadrimestre de votre période de stage :</option>
                <option value="Q1">Quad 1</option>
                <option value="Q2">Quad 2</option>
            </Form.Select>

            {/* === ETUDIANT === */}
            <h5>Etudiant :</h5>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">NOM</Form.Label>
                    <Form.Control required type="text" placeholder="NOM" name="nomEtudiant" value={formData.nomEtudiant} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Prénom</Form.Label>
                    <Form.Control required type="text" placeholder="Prénom" name="prenomEtudiant" value={formData.prenomEtudiant} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">N° national belge</Form.Label>
                    <Form.Control required type="" placeholder="N° national" name="nNationalEtudiant" value={formData.nNationalEtudiant} onChange={handleChange}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">E-mail</Form.Label>
                    <Form.Control required type="email" placeholder="E-mail" name="emailEtudiant" value={formData.emailEtudiant} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Téléphone</Form.Label>
                    <Form.Control required placeholder="Téléphone" name="telephoneEtudiant" value={formData.telephoneEtudiant} onChange={handleChange}/>
                </Form.Group>
            </Row>

            <br/>
            {/* === ADRESSE OFFICIEL ETUDIANT === */}
            <h5>Adresse officiel (sur la carte d'identité) :</h5>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Rue</Form.Label>
                    <Form.Control required type="text" placeholder="Rue" name="rueOffi" value={formData.rueOffi} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">N°</Form.Label>
                    <Form.Control required type="text" placeholder="N°" name="nOffi" value={formData.nOffi} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Code Postal</Form.Label>
                    <Form.Control required type="text" placeholder="Code Postal" name="codePostalOffi" value={formData.codePostalOffi} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Localité</Form.Label>
                    <Form.Control required type="text" placeholder="Ville" name="villeOffi" value={formData.villeOffi} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <br/>
            {/* === ADRESSE PENDANT STAGE === */}
            <h5>Adresse de l’étudiant (durant le stage) :</h5>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Rue</Form.Label>
                    <Form.Control required type="text" placeholder="Rue" name="rueStage" value={formData.rueStage} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">N°</Form.Label>
                    <Form.Control required type="text" placeholder="N°" name="nStage" value={formData.nStage} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Code Postal</Form.Label>
                    <Form.Control required type="text" placeholder="Code Postal" name="codePostalStage" value={formData.codePostalStage} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Localité</Form.Label>
                    <Form.Control required type="text" placeholder="Ville" name="villeStage" value={formData.villeStage} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <br/>
            {/* === COORDONEES STAGE === */}
            <h5>Coordonées du lieu de stage :</h5>
            <Form.Group className="mb-3">
                <Form.Label>Entreprise</Form.Label>
                <Form.Control required placeholder="Nom complet de l'entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange}/>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Rue</Form.Label>
                    <Form.Control required type="text" placeholder="Rue" name="rue" value={formData.rue} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">N°</Form.Label>
                    <Form.Control required type="text" placeholder="N°" name="n" value={formData.n} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Code Postal</Form.Label>
                    <Form.Control required type="text" placeholder="Code Postal" name="codePostal" value={formData.codePostal} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Localité</Form.Label>
                    <Form.Control required type="text" placeholder="Ville" name="ville" value={formData.ville} onChange={handleChange}/>
                </Form.Group>
            </Row>
            
            <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control required placeholder="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange}/>
            </Form.Group>
            <br/>

            {/* === CONTACT === */}
            <h5>Chef du personnel</h5>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">NOM, Prénom</Form.Label>
                    <Form.Control required type="text" placeholder="NOM, Prénom" name="chefPersonnel" value={formData.chefPersonnel} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">E-Mail</Form.Label>
                    <Form.Control required type="email" placeholder="E-Mail" name="emailChef" value={formData.emailChef} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Téléphone</Form.Label>
                    <Form.Control required type="" placeholder="Téléphone" name="telephoneChef" value={formData.telephoneChef} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <br/>
            <h5>Maître de stage</h5>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">NOM, Prénom</Form.Label>
                    <Form.Control required type="text" placeholder="NOM, Prénom" name="maitreDeStage" value={formData.maitreDeStage} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">E-Mail</Form.Label>
                    <Form.Control required type="email" placeholder="E-Mail" name="emailMaitre" value={formData.emailMaitre} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label className="mb-3">Téléphone</Form.Label>
                    <Form.Control required type="" placeholder="Téléphone" name="telephoneMaitre" value={formData.telephoneMaitre} onChange={handleChange}/>
                </Form.Group>
            </Row>
            <br/>

            <Form.Group className="mb-3">
                <Form.Label>Objectifs du stage suite à la première entrevue avec le Maître de stage :</Form.Label>
                <Form.Control required as="textarea" rows={4} name="objectifStage" value={formData.objectifStage} onChange={handleChange}/>
            </Form.Group>

            <fieldset>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Télétravail :</Form.Label>
                    <Col sm={10}>
                        <Form.Check type="radio" label="oui" name="teletravail" value="oui" checked={formData.teletravail === 'oui'} onChange={handleChange} />
                        <Form.Check type="radio" label="non" name="teletravail" value="non" checked={formData.teletravail === 'non'} onChange={handleChange} />
                    </Col>
                </Form.Group>
            </fieldset>

            <Button type="submit">
                Envoyer la proposition de stage
            </Button>
            
        </Form>
    );
}

export default FormProposition;