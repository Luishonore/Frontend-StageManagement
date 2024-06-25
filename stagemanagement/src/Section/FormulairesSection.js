import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddProposition from '../components/buttons/AddProposition';
import SelectListProposition from '../components/buttons/SelectListProposition';
import ListNonValiderProposition from '../components/card/ListNonValiderProposition';
import ListValiderProposition from '../components/card/ListValiderProposition';

const FormulairesSection = () => {
    // État pour gérer la visibilité des listes
    const [showNonValide, setShowNonValide] = useState(false);
    const [showValide, setShowValide] = useState(false);

    // Gérer la visibilité des listes lors du clic sur les boutons
    const handleShowNonValide = () => {
        setShowNonValide(true);
        setShowValide(false);
    };

    const handleShowValide = () => {
        setShowNonValide(false);
        setShowValide(true);
    };

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

    // Mise en page
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Formulaires</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                {isStudent && <AddProposition />}
                <br />
                
                <SelectListProposition 
                    onShowNonValide={handleShowNonValide}
                    onShowValide={handleShowValide}
                />
                <br />

                {showNonValide && <ListNonValiderProposition />}
                {showValide && <ListValiderProposition />}
            </section>
        </>
    );
}

export default FormulairesSection;
