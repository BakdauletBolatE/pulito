import Button from 'react-bootstrap/Button';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import SneakerItem from '../../components/Sneaker/SneakerItem';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';
import axios from 'axios';
import '../admin/create-order.css';
import Alert from 'react-bootstrap/Alert';

let mainUrl = 'http://127.0.0.1:8000'

class CreateOrder extends React.Component {
    state = {
        number_phone: '',
        name: '',
        orderPrice: 990,
        delivery: false,
        email: '',
        show: false,
        nameShoes: '',
        markShoes: '',
        isDefect: false,
        shoes_name: [
        ],
        users: [],
        errors: '',
        error: true,
        hideUserForm: true
    }

    componentDidMount() {
        console.log(this.props.user)
        this.setState({
            name: this.props.user.name,
            number_phone: this.props.user.number_phone,
            email: this.props.user.email
        })
    }
    makeid = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
       }
       return result;
    }

    getErrors = () => {
        const {number_phone, email, name,shoes_name} = this.state;
        if (number_phone === '' || email === '' || name === '') {
            this.setState({
                errors: 'Пожалуйста заполните пользавталея'
            })
        }
        else if ( shoes_name.length <= 0) {
            this.setState({
                errors: 'Пожалуйста для заказа нужно заполнить минимум один товар'
            })
        }
        else{
            this.setState({error: false})
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    setChecked = (value, name) => {
        this.setState({ [name]: value })
    }

    calculateTotalPrice = (shoes_name) => {
        let totalPrice = 0;
        shoes_name.map(item => {
            totalPrice += parseInt(item.orderPrice)
        })
        return totalPrice;
    }

    setActiveUser = (email, number_phone, name) => {
        this.setState({
            email: email, number_phone: number_phone, name: name
        })
        this.setState({ users: [] })
    }

    saveShoes = (e) => {
        const { nameShoes, markShoes, orderPrice, isDefect } = this.state;
        let obj = {
            name: nameShoes,
            mark: markShoes,
            orderPrice: orderPrice,
            isDefect: isDefect,
            unicId: this.makeid(5)
        }
        this.setState(prevState => ({
            shoes_name: [...prevState.shoes_name, obj],
            nameShoes: '',
            markShoes: '',
            orderPrice: 990
        }))
    }

    removeShoes = (id) => {
        let filteredArray = this.state.shoes_name.filter(item => item.unicId !== id)
        this.setState({shoes_name: filteredArray});
    }

    saveOrder = () => {
        console.log(this.state)
        const { number_phone, delivery, name, shoes_name,error } = this.state;

        let totalPrice = this.calculateTotalPrice(shoes_name);
        const form = { number_phone, delivery, name, shoes_name, totalPrice }

        form.number_phone = parseInt(form.number_phone.replace(/[^0-9]/g, ''), 10);

        if (!error) {
            this.props.createOrder(form, this.props.route);
            this.setState({
                number_phone: '',
                shoesType_id: 1,
                name: '',
                orderPrice: 990,
                delivery: false,
                show: false,
                shoes_name: [],
                nameShoes: '',
                markShoes: '',
                searchWord: ''
            })
            this.props.handleClose()
        }
        else{
            this.getErrors();
        }

        this.getErrors();

        

        
    }

    searchUsers = async (e) => {
        const searchWord = e.target.value;
        if (searchWord === '') {
            this.setState({ users: [] })
        }
        else {
            const res = await axios.get(`${mainUrl}/api/search-user/?search=${searchWord}`);
            this.setState({ users: res.data })
        }
        console.log(searchWord)



    }
    render() {
        const { searchWord, email, number_phone, name, delivery, shoes_name, nameShoes, markShoes, isDefect, users, hideUserForm,errors } = this.state;
        return <div>
            <Modal.Header closeButton>
                <Modal.Title>Создание заказа</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errors !== '' ? (
                    <Alert  variant="danger">
                        {errors}
                    </Alert>
                ) : ''}

        
                <Form>
                    <Form.Group>
                        <div className="mb-3 sneakers-item__grid">
                            {shoes_name.map((item, i) => (
                                <SneakerItem removeShoes={this.removeShoes} key={item.id} item={item}></SneakerItem>
                            ))}
                        </div>
                        <Form.Group>
                            <Form.Label>Обуви</Form.Label>
                            <Form.Control name="markShoes" value={markShoes} onChange={this.onChange} type="text" placeholder="Марка обуви" />
                            <Form.Control name="nameShoes" value={nameShoes} onChange={this.onChange} type="text" placeholder="Имя обуви" />
                            <Form.Select className="mb-3" name="orderPrice" onChange={this.onChange} aria-label="Default select example">
                                <option value="990">EXPRESS - Минимальная чистка и достаточный ежедневный уход за вашей обувью</option>
                                <option value="2990">STANDART - Комплексная паровая чистка обуви из ткани, искусственной кожи, канваса, резины, сетки и синтетических материалов.</option>
                                <option value="3990">CLASSIC - Комплексная паровая чистка обуви из натуральной кожи, замши и нубука, а так же антибактериальная обработка, пропитка кондиционером и удаление катышков на внутренней части обуви.
                                </option>
                                <option value="5490">VIP - Комплексная паровая чистка обуви из натуральной кожи, замши и нубука премиальных брендов, а так же антибактериальная обработка, пропитка кондиционером и удаление катышков на внутренней части обуви.</option>
                                <option value="7490">BRAND - Комплексная паровая чистка зимней обуви брендов Timberland, UGG и CHIRUCA.</option>
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <InputGroup className="mb-3">
                                <InputGroup.Checkbox type="checkbox" onChange={() => this.setChecked(!isDefect, "isDefect")} checked={isDefect} label="Есть ли дэфект?" />
                                <Form.Label>Есть ли дэфект?</Form.Label>
                                <Button variant="outline-secondary" onClick={this.saveShoes} >Добавить</Button>
                            </InputGroup>
                            </Form.Group>
                            
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className="mt-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onChange={() => this.setChecked(!delivery, "delivery")} checked={delivery} label="Доставка" />

                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>Выйти</Button>
                <Button variant="primary" onClick={this.saveOrder}>Создать заказ</Button>
            </Modal.Footer>
        </div>;
    }
}

const mapStateToProps = state => ({
    route: state.status.route,
    user: state.auth.user
})

export default connect(mapStateToProps, { createOrder })(CreateOrder);