import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {URL_ALLNOTE} from '../../utils/Api.js'

function AddNote({ societyId }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        accueil: '',
        charge: '',
        implication: '',
        lieu: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // Ajouter l'identifiant de la société aux données de la note
            const noteData = { ...formData, idSociete: societyId };
    
            const response = await axios.post(URL_ALLNOTE, noteData);
            console.log(response.data); // Afficher la réponse de l'API (si nécessaire)
            alert("Note ajouté avec succès !")
            handleClose();
        } catch (error) {
            console.error('Error adding note:', error);
            // Gérer les erreurs ici (afficher un message d'erreur, etc.)
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleShow}>Ajouter une évaluation de stage</Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Evaluation de stage</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form >
                        <fieldset>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>Accueil sur le lieu de stage :</Form.Label>
                                <Col sm={10} className='listradios'>
                                    {[0, 1, 2, 3, 4, 5].map((value) => (
                                        <Form.Check
                                            key={value}
                                            type="radio"
                                            label={value}
                                            name="accueil"
                                            value={value.toString()}
                                            checked={formData.accueil === value.toString()}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>Charge de travail :</Form.Label>
                                <Col sm={10} className='listradios'>
                                    {[0, 1, 2, 3, 4, 5].map((value) => (
                                        <Form.Check
                                            key={value}
                                            type="radio"
                                            label={value}
                                            name="charge"
                                            value={value.toString()}
                                            checked={formData.charge === value.toString()}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>Implication du maître de stage :</Form.Label>
                                <Col sm={10} className='listradios'>
                                    {[0, 1, 2, 3, 4, 5].map((value) => (
                                        <Form.Check
                                            key={value}
                                            type="radio"
                                            label={value}
                                            name="implication"
                                            value={value.toString()}
                                            checked={formData.implication === value.toString()}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>Lieux (conditions de travail, bureaux, etc...) :</Form.Label>
                                <Col sm={10} className='listradios'>
                                    {[0, 1, 2, 3, 4, 5].map((value) => (
                                        <Form.Check
                                            key={value}
                                            type="radio"
                                            label={value}
                                            name="lieu"
                                            value={value.toString()}
                                            checked={formData.lieu === value.toString()}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Soumettre la note
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNote;
