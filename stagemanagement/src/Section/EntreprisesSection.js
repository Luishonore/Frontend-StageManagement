import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsEntreprise from '../components/card/CardsEntreprise';

const EntreprisesSection = () => {
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Acceuil</Breadcrumb.Item>
                <Breadcrumb.Item active>Entreprises</Breadcrumb.Item>
            </Breadcrumb>
            <section className='entreprisesection'>
                <CardsEntreprise />
            </section>
        </>
    )
    
}

export default EntreprisesSection;