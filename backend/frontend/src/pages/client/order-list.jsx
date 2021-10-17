import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserOrders } from '../../actions/orders';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OrderItem from './order-item.jsx';
import './order.css';


function OrderList(props) {
    useEffect(() => {
        props.getUserOrders();
        
      }, [])
    if (props.isLoading) {
        return (
            <div className="order-list-container">
                <Spinner animation="border" />
            </div>
        )
    } 
    if (props.orders.length <= 0) {
      return (
          <div className="order-list-container">
              <div>Нет данных</div>
          </div>
      )
    }
    return ( 
        <div>
            <div className="order-client order-list-container">
                {props.orders.map(order => (
                    <OrderItem order={order} />
                ))}
            </div>
        </div>
     );
}

const mapStateToProps = state => ({
    route: state.status.route,
    orders: state.orders.orders,
    isLoading: state.orders.isLoading
  })

  export default connect(mapStateToProps, { getUserOrders })(OrderList);