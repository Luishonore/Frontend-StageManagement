import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SelectListProposition({ onShowNonValide, onShowValide }) {
    return (
        <ButtonGroup>
            <Button variant="danger" onClick={onShowNonValide}>liste non validée</Button>
            <Button variant="success" onClick={onShowValide}>liste validée</Button>
        </ButtonGroup>
    );
}

export default SelectListProposition;
