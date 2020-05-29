import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import OnewayTrip from './OnewayTrip';
import ReturnTrip from './ReturnTrip';
import MulticityTrip from './MulticityTrip';
import '../../../scss/newRequest.scss';

class TripTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneWayTrip: 'One way trip',
      returnTrip: 'Return trip',
      multicityTrip: 'Multicity trip',
    };
  }

  handleModalContent = (tripType) => {
    const { oneWayTrip, returnTrip, multicityTrip } = this.state;
    switch (tripType) {
      case oneWayTrip:
        return <OnewayTrip hanldeCancel={this.props.hanldeCancel} userProfile={this.props.userProfile} />;
      case returnTrip:
        return <ReturnTrip hanldeCancel={this.props.hanldeCancel} userProfile={this.props.userProfile} />;
      case multicityTrip:
        return <MulticityTrip hanldeCancel={this.props.hanldeCancel} userProfile={this.props.userProfile} />;
      default:
        return null;
    }
  }

  render() {
    const { tripType } = this.props;
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.hanldeCancel} scrollable>
          <Modal.Body className="modal-body">
            {this.handleModalContent(tripType)}
          </Modal.Body>

        </Modal>
      </>
    );
  }
}

export default TripTypeModal;

TripTypeModal.propTypes = {
  tripType: PropTypes.string,
  show: PropTypes.bool,
  userProfile: PropTypes.object,
  hanldeCancel: PropTypes.func,
};
