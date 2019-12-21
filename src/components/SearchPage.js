import React, { Component } from 'react';
import { connect } from "react-redux";
import { AutoComplete, Row, Col, Button } from 'antd';
import "../styles/searchPage.css";
import { getPlanetsList, logout } from "../actions/dataAction";
import ViewPage from "./ViewData";

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            seconds: 0,
            showData: false,
            data: {},
            searchCount: 0
        };
    }

    componentDidMount() {
        this.props.getPlanetsList();
    }

    componentDidUpdate() {
        if (this.state.seconds === 60) {
            this.setState({
                seconds: 0,
                searchCount: 0
            });
        }
    }

    startTimer = () => {
        if (this.state.seconds === 0) {
            setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        let seconds = this.state.seconds + 1;
        this.setState({
            seconds: seconds
        });
    }

    onSelect = (value) => {
        let data = Object.assign({}, this.state.data);
        this.props.planets.forEach((item) => {
            if (item.name === value) {
                data.name = item.name;
                data.rotation_period = item.rotation_period;
                data.orbital_period = item.orbital_period;
                data.diameter = item.diameter;
                data.climate = item.climate.toUpperCase();
                data.gravity = item.gravity.toUpperCase();
                data.terrain = item.terrain.toUpperCase();
                data.surface_water = item.surface_water;
                data.population = item.population;
            }
        });

        this.setState({ data, showData: true, searchCount: this.state.searchCount + 1 }, () => {
            this.startTimer();
        });
    }

    logout = () => {
        this.props.logout(this.props);
    }

    render() {
        const { data } = this.state;
        const { Option } = AutoComplete;

        const options = this.props.planets.map((item) => {
            if (parseInt(item.population) > 30000000) {
                return (
                    <Option style={{ fontWeight: "bold" }} key={item.name} value={item.name}>
                        {item.name}
                    </Option>
                );
            }
            if (isNaN(parseInt(item.population))) {
                return (
                    <Option style={{ color: "red" }} key={item.name} value={item.name}>
                        {item.name}
                    </Option>
                );
            }
            else {
                return (
                    <Option key={item.name} value={item.name}>
                        {item.name}
                    </Option>
                );
            }
        })

        if (this.props.loginUser !== "") {
            return (
                <div className="searchPageLayout">
                    <div>
                        <Row>
                            <Col span={24}>
                                <AutoComplete
                                    size="large"
                                    dataSource={options}
                                    className="customWidth"
                                    onSelect={this.onSelect}
                                    placeholder="Search Planets"
                                    filterOption={(inputValue, option) =>
                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    disabled={(this.props.loginUser !== "Luke Skywalker" && this.state.searchCount === 15 && this.state.seconds < 60) ? true : false}
                                />
                                <div className="logoutFloat">
                                    <p><strong>User:</strong> {this.props.loginUser} <Button type="link" onClick={this.logout}>Logout</Button></p>
                                </div>
                                <div className="customWidth">
                                    {(this.props.loginUser !== "Luke Skywalker" && this.state.searchCount === 15 && this.state.seconds < 60) ?
                                        <label className="errorColor">Allowed search per minute exceeded</label>
                                        :
                                        <label>*BOLD have population >30000k. RED have unknown population.</label>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        {this.state.showData ?
                            <ViewPage data={data} />
                            :
                            null}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="searchPageLayout">
                    You are not logged in.<Button type="link" onClick={this.logout}>Goto Login Page</Button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        planets: state.data.planets,
        loginUser: state.data.loginUser
    }
}

export default connect(mapStateToProps, { getPlanetsList, logout })(SearchPage);
