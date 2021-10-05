import React, { useState, Fragment } from 'react';
import '../style.css';
import { connect } from 'react-redux';
import { createOrder } from '../actions/orders';
import Button from 'react-bootstrap/Button';
import CreateOrder from './client/create-order.jsx';
import Modal from 'react-bootstrap/Modal';
import OrderList from './client/order-list.jsx';



const Main = (props) => {

  const [activeItem, setActiveItem] = useState(1);
  const [show, setShow] = useState(false)
  const selectActiveItem = (name) => {
    setActiveItem(name);
  }

  const data = [
    { id: 1, name: "Мой заказы" }, { id: 2, name: "Мой заявки" }
  ]
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <Fragment>
      <div className="main">
        <div className="container">
          <div className="nav">

            {data.map(item => (
              <div onClick={() => selectActiveItem(item.id)} key={item.id} className={activeItem === item.id ? "nav__item active" : "nav__item"}>{item.name}</div>

            ))}
            <div className="nav-item-last">
              <Modal show={show} onHide={handleClose}>
                <CreateOrder handleClose={handleClose} />
              </Modal>
              <Button onClick={handleShow} variant="primary">
                Создать новую заказ
              </Button>
            </div>
          </div>
          {activeItem == 1 ? (
            <div>
             <OrderList />
            </div>
          ) : ""}
          
        </div>
      </div>

    </Fragment>
  );
}


const mapStateToProps = state => ({
  route: state.status.route,
})

export default connect(mapStateToProps, { createOrder })(Main);
