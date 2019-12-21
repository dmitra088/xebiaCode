import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Alert } from 'antd';
import { getAccess } from "../actions/dataAction";
import "../styles/homePage.css";

class HomePage extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleUsername = (e) => {
        this.setState({ userName: e.target.value });
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getAccess(this.state.userName, this.state.password, this.props);
    };

    render() {
        return (
            <div className="customLoginStyle">
                <Form onSubmit={this.handleSubmit} className="login-form customLoginFormStyle">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" />}
                            className="inputLoginStyle"
                            placeholder="Username"
                            onChange={this.handleUsername}
                            value={this.state.userName}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" />}
                            className="inputLoginStyle"
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePassword}
                            value={this.state.password}
                        />
                    </Form.Item>
                    {this.props.loginFailure ?
                        <Alert message="Invalid Username/Password" type="error" />
                        : null}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginFailure: state.data.loginFailure
    }
}

export default connect(mapStateToProps, { getAccess })(HomePage);