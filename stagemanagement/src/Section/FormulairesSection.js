import React, { useState } from 'react';
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

    // Mise en page
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Formulaires</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                <AddProposition />
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
