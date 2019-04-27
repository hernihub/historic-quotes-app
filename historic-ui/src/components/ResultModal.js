import React from 'react';
import Modal from 'react-modal';
import ResultTable from './ResultTable';

const ResultModal = (props) => (
    <Modal
      isOpen={props.openModal}
      onRequestClose={props.handleCloseModal}
      contentLabel="Quote possible profit"
      closeTimeoutMS={200}
      className="modal">
        <ResultTable quote={props.quote} errorMessage={props.errorMessage} status={props.status}/>
        <button className="button" onClick={props.handleCloseModal}>OK</button>
    </Modal>
);
export default ResultModal;
