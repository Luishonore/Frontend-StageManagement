import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import 'moment/locale/fr';
import { URL_ALLDEPOT } from '../../utils/Api.js';

const CardsZoneDepot = () => {
    const [depots, setDepots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL_ALLDEPOT);
                setDepots(response.data);
            } catch (error) {
                console.error('Error fetching depots:', error);
            }
        };
      
        fetchData();
    }, []);

    // Fonction pour formater la date
    const formatDate = (date) => {
        return moment.utc(date).format("dddd D MMMM YYYY, HH:mm");
    };

    //Mise en page
    return(
        <>
            <Row xs={1} md={2} className="g-1">
                {depots.map((depot, idx) => (
                    <Col key={idx}>
                        <Card className='cardform' key={depot.idDepot}>
                            <Card.Header>{depot.nomDepot}</Card.Header>
                            <Card.Body>
                                <Card.Text>Fermeture du dépot : {formatDate(depot.dateFermeture)}</Card.Text>
                                <Card.Text>{depot.description}</Card.Text>
        
                            </Card.Body>
                        </Card> 
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CardsZoneDepot;