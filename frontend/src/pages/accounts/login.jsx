import React,{Fragment, useState,useEffect, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { useForm } from "react-hook-form";
import {login, load_user,check_authenticated} from '../../actions/auth';

const Login = (props) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        const {email, password} = data;
        props.login(email, password);
    };

    useEffect(() => {
        props.check_authenticated();
    },[])

        
    if (props.isAuthenticated) {
        return <Redirect to="/"></Redirect>
    }
    
    return (
            <Fragment>
                <ul className="list-group container">
                    <form onSubmit={handleSubmit(onSubmit)} method="post" >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input className="form-control" {...register("email", { required: true })}/>
                            {errors.email?.type === 'required' && "First name is required"}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input className="form-control" {...register("password", { required: true })}  />
                            {errors.password?.type === 'required' && "First name is required"}
                        </div>
        
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit">Логин</button>
                            <div>У вас нету аккаунта ? <Link to='/register'>Регистрация</Link> </div> 
                        </div>
                    </form>
        
                </ul>
        </Fragment>
    );
} 

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{load_user,login,check_authenticated})(Login);