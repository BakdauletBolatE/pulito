import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import {register, load_user,check_authenticated} from '../../actions/auth';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from "react-hook-form";

const Register = (props) =>  {
    const onSubmit = (data,e) => {
        e.preventDefault();
        const {email, password,re_password,number_phone,name} = data;
        props.register(email, password,re_password,number_phone,name);
    }

        const { register, formState: { errors }, handleSubmit } = useForm();
        
        if (props.isAuthenticated) {
            return <Redirect to="/"></Redirect>
        }

        return (
             <Fragment>
                   <ul className="list-group container">
                       <form onSubmit={handleSubmit(onSubmit)} method="post" >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Имя</label>
                                <input className="form-control" {...register("name", { required: true })}/>
                                {errors.name?.type === 'required' && "First name is required"}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input className="form-control" {...register("email", { required: true })}/>
                                {errors.email?.type === 'required' && "First name is required"}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number_phone" className="form-label">Телефон номера</label>
                                <input className="form-control" {...register("number_phone", { required: true })}/>
                                {errors.number_phone?.type === 'required' && "First name is required"}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input className="form-control" {...register("password", { required: true })}/>
                                {errors.password?.type === 'required' && "First name is required"}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="re_password" className="form-label">Пароль</label>
                                <input className="form-control" {...register("re_password", { required: true })}/>
                                {errors.re_password?.type === 'required' && "First name is required"}
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">{props.isLoading ? 'Loading': ''}Регистрация</button>
                                <div>У вас нету аккаунта ? <Link to='/register'> Регистрация</Link> </div> 
                            </div>
                       </form>
            
                    </ul>
            </Fragment>
        );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})
export default connect(mapStateToProps,{load_user,register,check_authenticated})(Register);