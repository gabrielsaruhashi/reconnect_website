import React from 'react';
import { Grid, Row, Image, Col, Panel } from 'react-bootstrap'
const Suggestion = ({suggestion}) => {
    console.log
    return (
		<Grid>
            <Col xs={6} md={4}>
                <Image style={{height: "10h", width:"10vh"}} src={suggestion.prof_pic} rounded/>
            </Col>
            <Col xs={6} md={8}>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{suggestion.name}</Panel.Title>
                        <Panel.Title componentClass="h2">{suggestion.school}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{suggestion.about_me}</Panel.Body>
                </Panel>
            </Col>
        </Grid>
	);
}

export default Suggestion;