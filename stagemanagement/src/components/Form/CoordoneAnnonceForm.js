import Card from 'react-bootstrap/Card';

const CoordoneAnnonceForm = ({ annonceCoordones }) => {

    // Mise en page
    return (
        <Card.Text>
            <div className='coordone1'>
                <div className='rue'><b>Rue : </b>{annonceCoordones.rue}</div>
                <div className='n'><b>N° : </b>{annonceCoordones.n}</div>
            </div>
            <div className='coordone2'>
                <div className='code-postal'><b>Code postal : </b>{annonceCoordones.code_postal}</div>
                <div className='ville'><b>Ville : </b>{annonceCoordones.ville}</div>
            </div>
            <div className='telephone'><b>Téléphone : </b>{annonceCoordones.telephone}</div>
            <div className='e-mail'><b>E-mail : </b>{annonceCoordones.email}</div>
            <div className='url'>
                <b>Site web : </b>
                <a href={annonceCoordones.url} target="blank">{annonceCoordones.url}</a>
            </div>
            <div className='activite'><b>Secteur d'activité : </b>{annonceCoordones.activite}</div>
        </Card.Text>
    );
}

export default CoordoneAnnonceForm;