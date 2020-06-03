import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../scss/mainpanel.scss';
import PropTypes from 'prop-types';
import pagination from '../../util/pagination';

export default class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      currentPage: 1,
    };
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.filter !== this.state.filter || this.state.currentPage !== prevState.currentPage) {
      let newArray;
      newArray = this.props.allTrips.filter((el) => el.status === this.state.filter);
      if (this.state.filter === 'all') newArray = this.props.allTrips;
      this.props.filter(pagination(newArray, this.state.currentPage));
    }
  }

  handleSelect = (eventKey) => {
    const { value } = eventKey.target;
    this.setState({ filter: value, currentPage: 1 });
  };

  pageUp = () => {
    this.setState((prevState, props) => {
      const newPage = prevState.currentPage + 1;
      let totalPage;
      totalPage = props.allTrips.filter((el) => el.status === prevState.filter).length / 5;
      if (prevState.filter === 'all') totalPage = props.allTrips.length / 5;
      if (newPage > Math.ceil(totalPage)) {
        return { currentPage: Math.ceil(totalPage) || 1 };
      }
      return { currentPage: newPage };
    });
  }

  pageDown = () => {
    if (this.state.currentPage === 1) {
      return;
    }
    this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
  }

  render() {
    const { currentPage, filter } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col xs="12" sm="12" md="12" lg="8">
            <div className="pagination">
              <div className="pagination_item">
                <div className="select-container">
                  <select className="pagination_select" name="filter" onChange={this.handleSelect} value={filter}>
                    <option value="all">All Travel Requests</option>
                    <option value="open">Open travel Requests</option>
                    <option value="rejected">Rejected Travel Requests</option>
                    <option value="accepted">Accepted Travel Requests</option>
                  </select>
                  <i className="arrow down" />
                </div>
              </div>
              <div className="page-controller">
                <div className="pagination_item number">
                  <h5>
                    {currentPage}
                  </h5>
                </div>
                <div className="pagination_item arrows">
                  <button type="button" name="down" onClick={this.pageDown}><i className="arrow left"> </i></button>
                  <button type="button" onClick={this.pageUp}><i className="arrow right"> </i></button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
MainPanel.propTypes = {
  allTrips: PropTypes.array,
  filter: PropTypes.func,
};
