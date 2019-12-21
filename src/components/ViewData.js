import React from 'react';
import { Statistic, Row, Col } from 'antd';

const ViewPage = ({data}) => {
    return (
        <div>
            <Row>
                <Col span={6}><Statistic title="Name" value={data.name} /></Col>
                <Col span={6}><Statistic title="Rotation Period" value={data.rotation_period} /></Col>
                <Col span={6}><Statistic title="Orbital Period" value={data.orbital_period} /></Col>
            </Row>
            <br />
            <Row>
                <Col span={6}><Statistic title="Diameter" value={data.diameter} /></Col>
                <Col span={6}><Statistic title="Climate" value={data.climate} /></Col>
                <Col span={9}><Statistic title="Gravity" value={data.gravity} /></Col>
            </Row>
            <br />
            <Row>
                <Col span={6}><Statistic title="Surface Weather" value={data.surface_water} /></Col>
                <Col span={6}><Statistic title="Population" value={data.population} /></Col>
                <Col span={9}><Statistic title="Terrain" value={data.terrain} /></Col>
            </Row>
        </div>
    );
}

export default ViewPage;