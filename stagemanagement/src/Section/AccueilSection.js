import Breadcrumb from 'react-bootstrap/Breadcrumb';
import LogoHEH from '../assets/images/logo_HEH_TEC.png'

const AcceuilSection = () => {

    //Mise en page
    return (
        <>
            <Breadcrumb className='breadvolet'>
                <Breadcrumb.Item active href="./">Accueil</Breadcrumb.Item>
            </Breadcrumb>
            <section className='bodysection'>
                <br />
                <h1>Bienvenue sur Stage Management !</h1>
                <img className='logoheh' alt='Logo du campus technique de la HEH' src={LogoHEH} />
                <p className='textaccueil'>"Stage Management" offre une solution afin de simplifier la gestion des stages pour les étudiants du campus techniques de la HEH.</p>
                <p className='textaccueil'>Voici les différentes section proposées</p>
                <p className='textaccueil'><b>Annonces : </b>Être à l'affût des dernières offres de stage grâce à cette section d'annonces, où les professeurs et coordinateurs partagent des opportunités provenant d'entreprises partenaires.</p>
                <p className='textaccueil'><b>Répertoire des Entreprises : </b>Explorer notre liste complète d'entreprises où les étudiants ont effectué leurs stages précédents. Accéder facilement aux informations de contact et consulter les évaluations de stages pour prendre des décisions éclairées.</p>
                <p className='textaccueil'><b>Proposition de Stage Simplifiée : </b>Soumettre facilement vos idées de stage via notre fonctionnalité de proposition simplifiée. Remplir les informations nécessaires en quelques clics afin de nous permettre de traiter votre demande rapidement.</p>
            </section>
        </>
    );
}

export default AcceuilSection;