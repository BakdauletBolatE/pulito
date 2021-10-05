import React, {Fragment, Component} from 'react';
import OrderItem from './OrderItem.jsx';
import {connect} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';


class OrderList extends Component {

    componentDidMount() {
        console.log("MOUNTED ORDERLIST")
    }
    componentDidUpdate(prevProps) {

        if (prevProps.route !== this.props.route) {
            console.log("UPDATED ORDERLIST")
        }
    }

    
    render() {
        console.log("Order List ",this.props.list);
        if (this.props.isLoading) {
            return (
                <div className="order-list-container">
                    <Spinner animation="border" />
                </div>
            )
        }
        if (this.props.list.length <= 0) {
            return (
                <div className="order-list-container">
                    <div>Нет данных</div>
                </div>
            )
        }
        
        
        const orderItems = this.props.list.map(orderItem=>(
            <OrderItem  key={orderItem.name} orderItem={orderItem} />
        ))
        return (
            <Fragment>
                   {orderItems}
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    route: state.status.route,
    isLoading: state.orders.isLoading,
})

export default connect(mapStateToProps)(OrderList);