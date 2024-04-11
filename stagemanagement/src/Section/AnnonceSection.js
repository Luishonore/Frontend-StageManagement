import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsAnnonce from '../components/card/CardsAnnonce';
import AddAnnonce from '../components/buttons/AddAnnonce';

const AnnonceSection = () => {
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Annonces</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                <AddAnnonce />
                <CardsAnnonce />
            </section>
        </>
    );
}

export default AnnonceSection;