import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsEntreprise from '../components/card/CardsEntreprise';

const EntreprisesSection = () => {
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Entreprises</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                <CardsEntreprise />
            </section>
        </>
    );
    
}

export default EntreprisesSection;