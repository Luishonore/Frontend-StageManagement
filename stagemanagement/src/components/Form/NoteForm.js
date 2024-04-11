import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const NoteForm = ({ societyNotes }) => {
    const getAverage = (notes) => notes.reduce((acc, note) => acc + note, 0) / notes.length;
  
    const accueilAverage = getAverage(societyNotes.map((note) => note.accueil));
    const chargeAverage = getAverage(societyNotes.map((note) => note.charge));
    const implicationAverage = getAverage(societyNotes.map((note) => note.implication));
    const lieuAverage = getAverage(societyNotes.map((note) => note.lieu));
  
    return (
      <Card.Text>
        <Table>
          <tbody>
            <tr>
              <td><b>Acceuil : </b></td>
              <td>{accueilAverage.toFixed(1)}</td>
            </tr>
            <tr>
              <td><b>Charge : </b></td>
              <td>{chargeAverage.toFixed(1)}</td>
            </tr>
            <tr>
              <td><b>Implication : </b></td>
              <td>{implicationAverage.toFixed(1)}</td>
            </tr>
            <tr>
              <td><b>Lieu : </b></td>
              <td>{lieuAverage.toFixed(1)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Text>
    );
  };

export default NoteForm;