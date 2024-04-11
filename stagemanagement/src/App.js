import './App.css';
import React, { useState } from 'react';
import NavBar from './components/headers/NavBar';
import AccueilSection from './Section/AccueilSection';
import EntreprisesSection from './Section/EntreprisesSection';
import AnnonceSection from './Section/AnnonceSection';


function App() {

  //affichage conditionnel sections
  const [activeSection, setActiveSection] = useState('accueil'); // Initial section
  const handleNavigationClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Mise en page
  return (
    <>
      {/* HEADER */}
      <NavBar onNavigationClick={handleNavigationClick} />
      {/* BODY */}
      {activeSection === 'accueil' && <AccueilSection />}
      {activeSection === 'annonces' && <AnnonceSection />}
      {activeSection === 'entreprises' && <EntreprisesSection />}
      {/* Add conditionals for other sections here */}
    </>
  );
}

export default App;