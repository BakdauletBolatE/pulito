import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrderById,getOrderRatesByFilters } from '../../actions/orders';
import Spinner from 'react-bootstrap/Spinner';
import SneakersItem from '../../components/Sneaker/SneakerItem';
import OrderItemRate from '../client/create-order-rate';

function OrderItemShow(props) {

    const returnStatusByNumberId = (id) => {
        if (id == 0) {
            return "В ожиданий"
        }
        if (id == 1) {
            return "В пути"
        }
        if (id == 2) {
            return "Готово"
        }
    }

    let { id } = useParams();
    const { order,user, isLoading, getOrderById } = props;

    useEffect(() => {
        getOrderById(id)
        // getOrderRatesByFilters(user.id,order.id)
    }, [id])
    
    if (isLoading) {
        return (
            <div className="order-list-container">
                <Spinner animation="border" />
            </div>
        )
    }
    if (order == null) {
        return (
            <div className="order-list-container">
                <div>Нет данных</div>
            </div>
        )
    }


    return (<div className="container">
        <h1></h1>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mt-5">
                <Link to="/"> <li className="breadcrumb-item mx-2">Главная</li></Link>
                <li className="breadcrumb-item active" aria-current="page">/ Заказ: {order.name}</li>
            </ol>
        </nav>
        <h1>{order.name}</h1>
        <div className="statuses">
            <li className="statuses__item">Статус вывоза: {returnStatusByNumberId(order.exportationStatus)} {order.exportationStatus}</li>
            <li className="statuses__item">Статус чистки: {returnStatusByNumberId(order.cleanStatus)} {order.cleanStatus}</li>
            <li className="statuses__item">Статус доставки: {returnStatusByNumberId(order.statusDelivery)} {order.statusDelivery}</li>
        </div>
        <div className="order-item-show">
            <div className="order-accordion-item order-sneaker-grid">
                {order.shoes_name.map(item => (
                    <SneakersItem
                        key={item.id}
                        item={item}
                    ></SneakersItem>
                ))}
            </div>
            <OrderItemRate order_id={order.id} user_id={user.id}></OrderItemRate>
        </div>
        

    </div>);
}

const mapStateToProps = state => ({
    order: state.orders.order,
    isLoading: state.orders.isLoading,
    user: state.auth.user
})

export default connect(mapStateToProps, { getOrderById,getOrderRatesByFilters })(OrderItemShow);