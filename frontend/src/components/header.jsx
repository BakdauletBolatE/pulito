import React from 'react';
import { Link } from 'react-router-dom';
import { load_user,check_authenticated,logout } from '../actions/auth';
import {connect} from 'react-redux';

class Header extends React.Component  {
    componentDidMount () {
        this.props.check_authenticated();
        this.props.load_user();
        
    }
    
    componentDidUpdate (prevProps) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            this.props.check_authenticated();
            this.props.load_user();
        }
    }
    
    render() {
        let links;
        const {isAuthenticated, user} = this.props;
        if (isAuthenticated){
            links = (
                <>
            <Link className="nav-link" to="/">Главная</Link>
            <div className="nav-link">{user ? user.name : ""}</div>
            <div className="nav-link" onClick={()=>{this.props.logout()}}>Выйти</div>
            </>
            )
        }
        else{
            links = <>
                    <Link className="nav-link" to="/login">Через телефон</Link>
                    <Link className="nav-link" to="/register">Регистрация</Link>
            </>
        }
        return (
            <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/"className="navbar-brand" >Pulito</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  {links}    
                </div>
                </div>
            </div>
            </nav>
            </header>
        )
    } 
}


const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{load_user,check_authenticated,logout})(Header);