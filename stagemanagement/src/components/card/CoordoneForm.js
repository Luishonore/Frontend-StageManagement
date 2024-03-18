import Card from 'react-bootstrap/Card';

const CoordoneForm = ({ society }) => {

    if (!society) return null; // Handle cases where society data is not yet available

    // Mise en page
    return (
        <Card.Text>
            <div className='coordone1'>
                <div className='rue'><b>Rue : </b>{society.rue}</div>
                <div className='n'><b>N° : </b>{society.n}</div>
            </div>
            <div className='coordone2'>
                <div className='code-postal'><b>Code postal : </b>{society.code_postal}</div>
                <div className='ville'><b>Ville : </b>{society.ville}</div>
            </div>
            <div className='telephone'><b>Téléphone : </b>{society.telephone}</div>
            <div className='e-mail'><b>E-mail : </b>{society.email}</div>
            <div className='activite'><b>Secteur d'activité : </b>{society.activite}</div>
        </Card.Text>
    );
}

export default CoordoneForm;