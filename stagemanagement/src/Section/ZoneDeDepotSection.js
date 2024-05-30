import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardsZoneDepot from '../components/card/CardsZoneDepot';

const ZoneDeDepotSection = () => {

    //Mise en page
    return(
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item href="./">Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Zone de dépôt</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                
                <CardsZoneDepot />
            </section>
        </>
    )
}

export default ZoneDeDepotSection;