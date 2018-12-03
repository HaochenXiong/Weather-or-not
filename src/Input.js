import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoxValue: ""
        };
        this.inputCity = this.inputCity.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);

    }

    inputCity(event) {
        this.setState({
            searchBoxValue: event.target.value
        })
    }

    buttonHandler() {
        this.props.getData(this.state.searchBoxValue);
    }

    render() {
        return (
            <div>
                <input class="Input" onChange={this.inputCity} type="text" placeholder="Type a city"></input>
                <br></br>
                <br></br>
                <Button bsSize="large" class="Button" onClick={this.buttonHandler}>Search</Button>
            </div>

        );
    }
}

export default Input;