import React, { Fragment, Component } from 'react';
import CustomSelect from './Select';
import Accordion from 'react-bootstrap/Accordion';
import SneakersItem from './Sneaker/SneakerItem';
import './Order.css';

class OrderItem extends Component {

    render() {
        const { totalPrice, id, name, exportationStatus, delivery, cleanStatus, statusDelivery, shoes_name, owner } = this.props.orderItem;


        return (

            <Fragment>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="mx-3"><strong>{name}</strong></div>
                            <div className="mx-3 order-accordion-item">Цена: <strong>{totalPrice}₸</strong></div>
                            <div className="mx-3 order-accordion-item">Имя: <strong>{owner.name}</strong></div>
                            <div className="order-accordion-item">Номер телефона: <strong>{owner.number_phone}</strong></div>
                        </Accordion.Header>
                        <Accordion.Body >
                            <div className="order-accordion-body-row">
                                <div>
                                    <div className="order-accordion-item">
                                       <strong> Цена доставки:</strong> {delivery ? '1000₸' : '0₸'}
                                    </div>
                                    <div className="order-accordion-item">
                                       <strong> Общая цена: </strong> {totalPrice} ₸
                                    </div>
                                    <div className="order-accordion-item">
                                        <div> <strong> Статус: </strong></div> <CustomSelect id={id}
                                            name={name}
                                            exportationStatus={exportationStatus}
                                            cleanStatus={cleanStatus}
                                            statusDelivery={statusDelivery}
                                        ></CustomSelect>
                                    </div>
                                    <div className="order-accordion-item">
                                       <strong> {shoes_name.length }</strong> заказов
                                    </div>
                                    <div className="order-accordion-item order-sneaker-grid">
                                        {shoes_name.map(item => (
                                            <SneakersItem
                                                key={item.id}
                                                item={item}
                                            ></SneakersItem>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="order-accordion-item row">
                                        <div className="order-accordion-item font-size22">Общая информация о клиенте:</div>
                                        <div className="order-accordion-item"><strong>Имя: </strong> {owner.name}</div>
                                        <div className="order-accordion-item"><strong>Номер телефона: </strong> {owner.number_phone}</div>
                                        <div className="order-accordion-item"><strong>Почта: </strong> {owner.email}</div>
                                    </div>
                                </div>
                            </div>


                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Fragment>
        )
    }

}

export default OrderItem;