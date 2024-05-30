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
                <p className='textaccueil'>"Stage Management" offre une solution pour simplifier la gestion des stages pour les étudiants du campus techniques de la HEH.</p>

                <p className='textaccueil'><b>Annonces : </b>Restez à l'affût des dernières offres de stage grâce à notre section d'annonces, où les professeurs et coordinateurs partagent des opportunités provenant d'entreprises partenaires.</p>
                <p className='textaccueil'><b>Répertoire des Entreprises : </b>Explorez notre liste complète d'entreprises où les étudiants ont effectué leurs stages précédents. Accédez facilement aux informations de contact et consultez les évaluations de stages pour prendre des décisions éclairées.</p>
                <p className='textaccueil'><b>Proposition de Stage Simplifiée : </b>Soumettez facilement vos idées de stage via notre fonctionnalité de proposition simplifiée. Remplissez les informations nécessaires en quelques clics pour nous permettre de traiter votre demande rapidement.</p>
                
            </section>
        </>
    );
}

export default AcceuilSection;