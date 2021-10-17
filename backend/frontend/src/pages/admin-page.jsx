import React, { Component, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from '../components/navigation';
import '../style.css';
import { connect } from 'react-redux';
import { createOrder } from '../actions/orders';
import Modal from 'react-bootstrap/Modal';
import { getExportationList } from '../actions/status';
import CreateOrder from './admin/create-order';




class Main extends Component {

  state = {
    show: false,
  }



  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });


  render() {

    const { show } = this.state;
    return (
      <BrowserRouter >
        <Fragment>
          <div className="main">
            <div className="container">
              <Modal show={show} onHide={this.handleClose}>
                <CreateOrder handleClose={this.handleClose}/>
              </Modal>

              <Navigation ShowMyScrenn={this.handleShow}></Navigation>

            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }

}


const mapStateToProps = state => ({
  route: state.status.route
})

export default connect(mapStateToProps, { createOrder, getExportationList })(Main);
