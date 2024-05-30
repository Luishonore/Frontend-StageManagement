import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsAnnonce from '../components/card/CardsAnnonce';
import AddAnnonce from '../components/buttons/AddAnnonce';

const AnnonceSection = () => {
    const [isStagiaire, setIsStagiaire] = useState(false);

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
        setIsStagiaire(roles.includes('Stagiaires'));
    }, []);

    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Annonces</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                {!isStagiaire && <AddAnnonce />}
                <CardsAnnonce />
            </section>
        </>
    );
}

export default AnnonceSection;
