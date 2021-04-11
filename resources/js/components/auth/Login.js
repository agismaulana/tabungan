import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import './auth.css';
import img from '../../image/ilustrasi/logo.svg';

const axios = require('axios');

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            login: [],
            dataLogin: {
                username: "",
                password: "",
            },
            errors: {
                usernameErrors: "",
                passwordErrors: "",
            },
            redirect: false,
            status: "",
            message: "",
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(localStorage.length > 0) {
            this.setState({
                redirect: true,
            })
        } else {
            this.setState({
                redirect: false,
            })
        }
    }

    handleChangeUsername(e) {
        this.setState({
            dataLogin: {
                username: e.target.value,
                password: this.state.dataLogin.password,
            },
            errors: {
                usernameErrors: "",
                passwordErrors: this.state.errors.passwordErrors,
            }
        });
    }

    handleChangePassword(e) {
        this.setState({
            dataLogin: {
                username: this.state.dataLogin.username,
                password: e.target.value,
            }, 
            errors: {
                usernameErrors: this.state.errors.usernameErrors,
                passwordErrors: "",
            }
        })
    }

    timeStatus() {
        if(this.state.status != "") {
            setTimeout(()=>{
                this.setState({
                    status: "",
                    message: "",
                })
            }, 3000)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const {dataLogin, errors} = this.state;

        const login = {
            username: dataLogin.username,
            password: dataLogin.password,
        }

        if(dataLogin.username == "") {
            errors.usernameErrors = "Username Harus Diisi";
        }

        if(dataLogin.password == "") {
            errors.passwordErrors = "Password Harus Diisi";
        }

        if(errors.UsernameErrors || errors.passwordErrors) { 
            this.setState({errors})
        } else {   
            axios.post(`http://${window.location.host}/api/send-login`, 
                        login)
            .then((response) => {
                let {login} = this.state;

                const userBaru = [...login];
                this.setState({
                    dataLogin: {
                        username: "",
                        password: "",
                    },
                })

                if(response.data.status == 200) {
                    localStorage.setItem('id_users', response.data.user.id_users);
                    localStorage.setItem('nama', response.data.user.username);
                    localStorage.setItem('level', response.data.user.level);
                    if(localStorage.length > 0) {
                        this.setState({
                            redirect: true,
                        })
                    }
                } else {
                    this.setState({
                        dataLogin: {
                            username: "",
                            password: "",
                        },
                        status: response.data.status,
                        message: response.data.message,
                    }, () => this.timeStatus())
                }
            });
        }
    }

    render() {
        const {dataLogin, status, message, errors} = this.state;

        if(localStorage.length > 0) {
            if(this.state.redirect) {
                return <Redirect to="/home"/>
            }
        }

        let sendMessage = "";
        if(status == 200) {
            sendMessage = <div className="alert alert-success" role="alert">{message}</div>
        } else if(status == "failed") {
            sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
        } else {
            sendMessage = "";
        }

        return (
            <div className="login-wrap">
                <div className="row col-md-5">
                    <div className="card col-md-12 bg-dark">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h2 className="text-center font-weight-bold mb-5 text-white">
                                        <img src={img} alt="logo" style={{height:'80px'}}/> MyDeposits
                                    </h2>
                                    <form onSubmit={this.handleSubmit}>
                                    {sendMessage}
                                    <div className="form-group">
                                        <input
                                            className="form-control bg-dark text-white" 
                                            placeholder="Username"
                                            value={dataLogin.username}
                                            onChange={this.handleChangeUsername}
                                        />
                                        <span className="text-danger">{errors.usernameErrors}</span>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password"
                                            className="form-control bg-dark text-white" 
                                            placeholder="Password" 
                                            value={dataLogin.password}
                                            onChange={this.handleChangePassword} />
                                        <span className="text-danger">{errors.passwordErrors}</span>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-3">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
