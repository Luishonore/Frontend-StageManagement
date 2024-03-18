import './App.css';
import React, { useState } from 'react';
import NavBar from './components/headers/NavBar';
import AcceuilSection from './Section/AcceuilSection';
import EntreprisesSection from './Section/EntreprisesSection';


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
      {activeSection === 'accueil' && <AcceuilSection />}
      {activeSection === 'entreprises' && <EntreprisesSection />}
      {/* Add conditionals for other sections here */}
    </>
  );
}

export default App;