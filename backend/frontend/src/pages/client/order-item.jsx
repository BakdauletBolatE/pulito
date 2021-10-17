import { Link } from 'react-router-dom';

function OrderItem(props) {
    let orderStatus;

    if (props.order.status === 1) {
        orderStatus = ( <div className="order-item-client-item order-item-client-item--status"><strong> Статус заказа: Вывоз</strong > </div> )
    }
    else if (props.order.status === 2) {
        orderStatus = ( <div className="order-item-client-item order-item-client-item--status"><strong> Статус заказа: В чистке</strong > </div> )
    }
    else if (props.order.status === 3) {
        orderStatus = ( <div className="order-item-client-item order-item-client-item--status"><strong> Статус заказа: В доставке</strong > </div> )
    }
    else if (props.order.status === 4) {
        orderStatus = ( <div className="order-item-client-item order-item-client-item--status"><strong> Статус заказа: Готовые</strong > </div> )
    }
    return ( 
        <div>
            <div className="order-item-client">
                <div className="order-item-client-item order-item-client-item--name"><Link to={`/order/${props.order.id}`}>Номер заказа: <strong>{props.order.name}</strong></Link> </div>
                {orderStatus}
                <div className="order-item-client-item order-item-client-item--totalprice">Цена: {props.order.totalPrice}</div>
            </div>
        </div>
     );
}

export default OrderItem;