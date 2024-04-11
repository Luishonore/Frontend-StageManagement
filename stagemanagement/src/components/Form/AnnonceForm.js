import Card from 'react-bootstrap/Card';

const AnnonceForm = ({annonce}) => {

    if (!annonce) return null; // Handle cases where society data is not yet available

    // Mise en page
    return (
        <Card.Text>
            <div>{annonce.description}</div>
            <br />
            <Card.Title>Contact :</Card.Title>
            <div><b>NOM, Prénom : </b>{annonce.nomContact}, {annonce.prenomContact}</div>
            <div><b>E-mail : </b>{annonce.emailContact}</div>
            <div><b>Téléphone : </b>{annonce.telephoneContact}</div>
        </Card.Text>
    );
}

export default AnnonceForm;