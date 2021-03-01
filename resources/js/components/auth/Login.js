import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import './auth.css';

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
            redirect: false,
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(sessionStorage.length > 0) {
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
            }
        });
    }

    handleChangePassword(e) {
        this.setState({
            dataLogin: {
                username: this.state.dataLogin.username,
                password: e.target.value,
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const login = {
            username: this.state.dataLogin.username,
            password: this.state.dataLogin.password,
        }

        axios.post("http://127.0.0.1:8000/api/send-login", 
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
                sessionStorage.setItem('nama', response.data.user.username);
                sessionStorage.setItem('level', response.data.user.level);
                if(sessionStorage.length > 0) {
                    this.setState({
                        redirect: true,
                    })
                }
            } else {
                this.setState({
                    dataLogin: {
                        username: "",
                        password: "",
                    }
                })
            }
        });
    }

    render() {
        const {dataLogin} = this.state;

        if(sessionStorage.length > 0) {
            if(this.state.redirect) {
                return <Redirect to="/home"/>
            }
        }

        return (
            <div className="login-wrap">
                <div className="row col-md-6">
                    <div className="card col-md-12 bg-dark">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h2 className="text-center font-weight-bold mb-5 text-white">
                                        MyWallet
                                    </h2>
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            className="form-control bg-dark text-white" 
                                            placeholder="Username"
                                            value={dataLogin.username}
                                            onChange={this.handleChangeUsername}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password"
                                            className="form-control bg-dark text-white" 
                                            placeholder="Password" 
                                            value={dataLogin.password}
                                            onChange={this.handleChangePassword} />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-3">Login</button>
                                    </form>
                                    <Link to="/forgot">Lupa Password?</Link>
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
