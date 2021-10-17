import React, { Fragment,useState,useEffect } from 'react';
import { connect } from 'react-redux';
import OrderList from './OrderList.jsx';
import Button from 'react-bootstrap/Button';
import { setRoute} from '../actions/status';
import {getOrdersById} from '../actions/orders';

const Navigation = (props) => {
    const [activeItem, setActiveItem] = useState(1);
    const selectActiveItem = (name) => {
        setActiveItem(name);
    }
    const data = [
        { id: 1,name: "Заявки"},{id: 2,name:"Чистка"},{id:3,name:"Доставке"},{id:4,name:"Готовые"}
    ]

    useEffect(() => {
        props.getOrdersById(activeItem)
        props.setRoute(activeItem)
        console.log("UPDETED")

    },[activeItem])

    


    return (
        <Fragment>
        <div className="nav">
            
                {data.map(item=>(
                    <div onClick={()=> selectActiveItem(item.id)} key={item.id} className={activeItem === item.id ? "nav__item active" : "nav__item"}>{item.name}</div>
                    
                ))}
                <div className="nav-item-last">
                <Button onClick={()=> props.ShowMyScrenn()}variant="primary">
                    Создать новую заказ
                  </Button>
                </div>
        </div> 
        <div>
        {/* <div className="input-group flex-nowrap mb-4">
                        <span className="input-group-text" id="addon-wrapping">Поиск</span>
                        <input type="text" className="form-control" placeholder="Искать по номеру заказа" aria-label="Искать по номеру заказа" aria-describedby="addon-wrapping"/>
                    </div> */}
            
            <OrderList list={props.list} ></OrderList>
        </div>
        </Fragment>
    )
   
}

const mapStateToProps = state => ({
    id: state.status.route,
    list: state.orders.orders
})

export default connect(mapStateToProps,{getOrdersById,setRoute})(Navigation);