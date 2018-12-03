import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from "./Input";
import request from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      city: "",
      tp: "",
      ws: "",
      aqicn: undefined,
    };
    this.getWeatherData = this.getWeatherData.bind(this);
  }
  getWeatherData(city) {
    this.setState({
      message: "searching...",
      city: "",
      tp: "",
      ws: "",
      aqicn: undefined,
    })

    let url = "http://open.mapquestapi.com/geocoding/v1/address?key=YUIW6pg2Q7O2EW1qpEf8eIFGNAX2lXGr&location=" + city

    request
      .get(url)
      .then(res => {


        let lat = res.body.results[0].locations[0].latLng.lat;
        let lng = res.body.results[0].locations[0].latLng.lng;


        let airVisualURL = "http://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lng + "&key=yPevGZq8FvHDZNpCo"

        request
          .get(airVisualURL)
          .then(res => {

            console.log(res.body);
            this.setState({
              message: "",
              city: res.body.data.city,
              tp: "Tempreture: " + res.body.data.current.weather.tp + " ℃",
              ws: "Wind Speed: " + res.body.data.current.weather.ws + " m/s",
              aqicn: "AQI: " + res.body.data.current.pollution.aqicn,
            })
          })
          .catch(err => {
            this.setState({
              message: "404 Not Found",

            })
          });

      })
      .catch(err => {
        console.log("ERRORRROROROROR");
        this.setState({
          message: "404 Not Found",

        })
      });
  }

  render() {
    return (
      <div className="App">
        <h1 class="elegantshadow">Weather<br></br>or<br></br>not</h1>
        <Input getData={this.getWeatherData} />
        <div class="Mess">
          <p>{this.state.message}</p>
          <p>{this.state.city}</p>
          <p>{this.state.tp}</p>
          <p>{this.state.ws}</p>
          <p>{this.state.aqicn}</p>
        </div>
      </div>
    );
  }
}

export default App;
