import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { URL_ALLSOCIETES } from '../../utils/Api.js';

function FormSociete( {setShowSocieteForm} ) {
  
    const [formData, setFormData] = useState({
        nom: '',
        rue: '',
        n: '',
        code_postal: '',
        ville: '',
        telephone: '',
        email: '',
        url: '',
        activite: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fonction pour envoyer les données à l'API
    const handleSubmitsociete = async (event) => {
        event.preventDefault();

        const data = getFormData();

        try {
            const response = await axios.post(URL_ALLSOCIETES, data);
            console.log(response.data); // Affiche la réponse de l'API
            // Gérer le succès de l'envoi
            alert("Société créée avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi des données:", error);
            // Gérer l'erreur de l'envoi
            alert("Une erreur est survenue lors de la création de la société.");
        }
    };

    // Fonction pour récupérer les données du formulaire
    const getFormData = () => {
        return { ...formData };
    };

    // Mise en page
    return (
        <Form onSubmit={handleSubmitsociete}>
        {/* Nom */}
        <Form.Group className="mb-3">
            <Form.Label>NOM</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Nom de l'entreprise"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            />
        </Form.Group>

        {/* Rue */}
        <Form.Group className="mb-3">
            <Form.Label>Rue</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Rue"
            name="rue"
            value={formData.rue}
            onChange={handleChange}
            />
        </Form.Group>

        <Row className="mb-3">
            {/* N° */}
            <Form.Group as={Col}>
            <Form.Label>N°</Form.Label>
            <Form.Control required placeholder="N°" name="n" value={formData.n} onChange={handleChange} />
            </Form.Group>
            {/* Code postal */}
            <Form.Group as={Col}>
            <Form.Label>Code postal</Form.Label>
            <Form.Control required placeholder="Code postal" name="code_postal" value={formData.code_postal} onChange={handleChange} />
            </Form.Group>
            {/* Ville */}
            <Form.Group as={Col}>
            <Form.Label>Ville</Form.Label>
            <Form.Control required type="text" placeholder="Ville" name="ville" value={formData.ville} onChange={handleChange} />
            </Form.Group>
        </Row>

        {/* Telephone */}
        <Form.Group className="mb-3">
            <Form.Label>Telephone</Form.Label>
            <Form.Control required placeholder="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control required type="email" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>

        {/* Url */}
        <Form.Group className="mb-3">
            <Form.Label>Site web</Form.Label>
            <Form.Control required placeholder="Url" name="url" value={formData.url} onChange={handleChange} />
        </Form.Group>

        {/* Activité */}
        <Form.Group className="mb-3">
            <Form.Label>Domaine d'activité</Form.Label>
            <Form.Control required type="text" placeholder="Domaine d'activité" name="activite" value={formData.activite} onChange={handleChange} />
        </Form.Group>

        <Button className="mb-3" type="submit">Créer la société</Button>
        </Form>
    );
}

export default FormSociete;