import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import {login, load_user,check_authenticated, login_phone, verify_phone} from '../../actions/auth';

class LoginPhone extends Component {

    state={
        number_phone: '',
        code: "",
        isVerified: false,
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {number_phone} = this.state;
        this.props.login_phone(number_phone);
    }


    componentDidMount() {
        console.log('start')
        this.props.check_authenticated()
    }

    componentWillUnmount() {
        console.log('end');
    }

    onChange = e => this.setState({[e.target.name]: e.target.value })
    onSubmitLogin = (e) => {
        e.preventDefault();
        const {number_phone,code} = this.state;
        this.props.verify_phone(number_phone,code);
    }
    render() {
        
        if (this.props.isAuthenticated) {
            return <Redirect to="/"></Redirect>
        }
        

        let phoneForm = "";

        if (!this.props.isPhoneWrited) {
            phoneForm = <Fragment>
                    <form onSubmit={this.onSubmit} method="post" >
                    <div className="mb-3">
                        <label htmlFor="number_phone" className="form-label">Телефон номера</label>
                        <input type="text" name="number_phone" value={this.state.number_phone}  onChange={this.onChange} className="form-control" id="number_phone" placeholder="77059943864"/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Дальше</button>
                    </div>
               </form>
               </Fragment>
        }
        else{
            phoneForm = <Fragment>
            <form onSubmit={this.onSubmitLogin} method="post" >
            <div className="mb-3">
                <label htmlFor="code" className="form-label">Код из шести цифр</label>
                <input type="text" name="code" value={this.state.code}  onChange={this.onChange} className="form-control" id="code" placeholder="*** ***"/>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">Логин</button>
            </div>
       </form>
       </Fragment>
        }
       
        const {number_phone} = this.state;
        return (
             <Fragment>
                   <ul className="list-group container">

                        {phoneForm}

                    </ul>
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isPhoneWrited: state.auth.isPhoneWrited
})
export default connect(mapStateToProps,{load_user,login,check_authenticated,login_phone,verify_phone})(LoginPhone);