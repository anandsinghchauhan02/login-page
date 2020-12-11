import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import './LoginForm.css';
import { Redirect } from 'react-router';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        let { email, password } = this.state;
        let { isLoginPending, isLoginSuccess, loginError } = this.props;
        return (
            <div>
                <div className="FormContainer">
                    <form name="loginForm" onSubmit={this.onSubmit}>
                        <div className="form-group-collection">
                            <div>
                                <h3 className="Userlogin">User Login</h3>
                            </div>
                            <div className="form-group">
                                {/* <label>Email:</label><br/> */}
                                <input type="email" name="email" onChange={e => this.setState({ email: e.target.value })} value={email} placeholder="email" />
                            </div>

                            <div className="form-group">
                                {/* <label>Password:</label><br /> */}
                                <input type="password" name="password" onChange={e => this.setState({ password: e.target.value })} value={password} placeholder="password" />
                            </div>
                        </div>

                        {/* <input type="submit" value="Login" /> */}
                        <button onClick="submit" className="submitButton">Submit</button>
                        {/* <a href="/users">fff</a> */}
                        <div className="message">
                            {isLoginPending && <div>Please wait...</div>}
                            {isLoginSuccess && <Redirect push to="/users" />
                            }
                            {loginError && <div style={{ color: '#ffc107' }}>{loginError.message}</div>}
                        </div>
                    </form>
                </div>
                <div>
                    <p>Email: admin@gmail.com</p>
                    <p>Password: admin123</p>
                </div>
            </div>
        )
    }

    
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
