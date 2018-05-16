import React, {Component} from 'react';

class GoogleMap extends Component {
  
    componentDidMount() {
        // take reference to HTML element, render embedded map into it
        new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat:parseInt(this.props.lat),
                lng: parseInt(this.props.lon)
            }
        })
    }

    render() {
        // ref system in react - short for react that allows us to create direct 
        // reference to element in the page
        // this.refs.map
        return <div ref="map" />;
    }

}

export default GoogleMap;