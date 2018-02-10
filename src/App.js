import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import $ from 'jquery';

import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            searchTerm: ""
        }
    }
    // the function that searches for the image
    searchImage(e) {
        e.preventDefault();
        $("#images").html("");
        let searchTerm = this.state.searchTerm;
        let flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?tags="+this.state.searchTerm+"&format=json&jsoncallback=?";
        $.getJSON(flickrURL)
            .done(function(data){
                if(data.items.length===0){
                    $('#images').append("Nothing Found!");
                }
                $.each(data.items, function(i, item){
                    $('<div/>', {
                        class: "img-data",
                        id: i
                    }).appendTo("#images");
                    $("<h5>").append(item.title).appendTo("#"+i);
                    $("<img>").attr("src", item.media.m).appendTo("#"+i);
                })
            });
    };
  render() {
    return (
      <div className="App">
            <Form inline action="/" method="POST" onSubmit={(e) => {this.searchImage(e)}}>
                <FormGroup>
                    <ControlLabel>Search for Image!</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Input Text Here" onChange={(e) => {
                        this.setState({searchTerm: e.target.value});
                    }}/>
                </FormGroup>{' '}
                <Button bsStyle="success" type="submit">Search</Button>
            </Form>
            <div id="images">
            </div>
      </div>
    );
  }
}

export default App;
