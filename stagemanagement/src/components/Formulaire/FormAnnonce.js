import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { URL_ALLANNONCE, URL_ALLSOCIETES } from '../../utils/Api.js';
import AddSociete from '../buttons/AddSociete.js';


function FormAnnonce() {
    // Affichage conditionnel du formulaire de société
    const [showSocieteForm, setShowSocieteForm] = useState(false);

    // Données du formulaire
    const [formData, setFormData] = useState({
        description: "",
        tagSection: "",
        nomContact: "",
        prenomContact: "",
        emailContact: "",
        telephoneContact: "",
        idSociete: "",
    });

    // Chargement et affichage des sociétés pour le SELECT
    const [companies, setCompanies] = useState([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
        setIsLoadingCompanies(true);
        try {
            const response = await axios.get(URL_ALLSOCIETES);
            setCompanies(response.data);
        } catch (error) {
            console.error("Erreur dans la recherche d'entreprises: ", error);
        } finally {
            setIsLoadingCompanies(false);
        }
        };

        fetchCompanies();
    }, []);

    // Gestion du formulaire d'annonce
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
        description: formData.description,
        tagSection: formData.tagSection,
        nomContact: formData.nomContact,
        prenomContact: formData.prenomContact,
        emailContact: formData.emailContact,
        telephoneContact: formData.telephoneContact,
        idSociete: formData.idSociete,
        };

        // Envoyer les données à l'API
        try {
            const response = await axios.post(URL_ALLANNONCE, data);
            console.log(response.data); // Affiche la réponse de l'API
            // Gérer le succès de l'envoi
            alert("Annonce créée avec succès !");
        } 
        catch (error) {
            console.error("Erreur lors de l'envoi de l'annonce:", error);
            // Gérer l'erreur de l'envoi
            alert("Une erreur est survenue lors de la création de l'annonce.");
        }
    };

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "idSociete" && value === "") {
        setShowSocieteForm(true);
        } else {
        setShowSocieteForm(false);
        }
    };

    // Mise en page
    return(
        <Form onSubmit={handleFormSubmit}>
            {/* description */}
            <Form.Group className="mb-3">
                <Form.Label>Description de l'annonce</Form.Label>
                <Form.Control required as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange}/>
            </Form.Group>
            
            {/* tagSection */}
            <Form.Select className="mb-3" aria-label="Section scolaire" name="tagSection" value={formData.tagSection} onChange={handleChange}>
                <option>Choisisez une section</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Développement">Développement</option>
                <option value="Infographiste">Infographiste</option>
            </Form.Select>
            
            <Row className="mb-3">
                <h5>Coordonées contact</h5>
                {/* nomContact */}
                <Form.Group as={Col} md="4">
                    <Form.Label>NOM</Form.Label>
                    <Form.Control required type="text" placeholder="NOM" name="nomContact" value={formData.nomContact} onChange={handleChange}/>
                </Form.Group>
                {/* prenomContact */}
                <Form.Group as={Col} md="4">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control required type="text" placeholder="Prénom" name="prenomContact" value={formData.prenomContact} onChange={handleChange}/>
                </Form.Group>
            </Row>

            {/* emailContact */}
            <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control required type="email" placeholder="E-mail" name="emailContact" value={formData.emailContact} onChange={handleChange}/>
            </Form.Group>

            {/* telephoneContact */}
            <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control required placeholder="Téléphone" name="telephoneContact" value={formData.telephoneContact} onChange={handleChange} />
            </Form.Group>

            {/* idSociete */}
            <Form.Group className="mb-3">
                <Form.Label>Société</Form.Label>
                {isLoadingCompanies ? (
                    <Form.Control type="text" disabled value="Chargement des sociétés..." />
                ) : (
                    <Form.Select aria-label="Société" name="idSociete" value={formData.idSociete} onChange={handleChange} disabled={showSocieteForm}>
                    <option>Choisissez une société</option>
                    {companies.map((company) => (
                        <option key={company.idSociete} value={company.idSociete}>{company.nom}</option>
                    ))}
                    </Form.Select>
                )}
            </Form.Group>

            <Button variant='secondary' onClick={() => setShowSocieteForm(true)}>
                Nouvelle société ?
            </Button>            
            {showSocieteForm && <AddSociete setShowSocieteForm={setShowSocieteForm}/>}
            
            <Button type="submit" disabled={showSocieteForm}>
                Ajouter l'annonce
            </Button>
        </Form>
    );
}

export default FormAnnonce;