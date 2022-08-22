// By Kireshanth T

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import './Presentational.css';

let quotes = {};
let quoteResults;

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

export default class Presentational extends Component {
  constructor() {
    super();
    this.state = {
      quote: "Never, never, never give up.",
      author: "Winston Churchill"
    };
    this.randomQuote = this.randomQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }

  componentDidMount() {
    fetch("https://api.quotable.io/quotes?tags=famous-quotes&limit=200")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(typeof(data));
        quotes = data;
        quoteResults = data.results;
      });
    this.randomColor();
  }
  
  randomNumber(value){
    return Math.floor(Math.random() * value);
  }
  
  tweetQuote() {
    const element = document.getElementById("tweet-quote");
    const URL =
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
    element.setAttribute(
      "href",
      URL + '"' + this.state.quote + '" ' + this.state.author
    );
  }
  
  randomColor(){
    const randomNum = this.randomNumber(colors.length);
    document.documentElement.style.setProperty('--color-scheme', colors[randomNum]);
  }

  randomQuote() {
    
    const randomNum = this.randomNumber(quotes.count);
    this.setState({
      quote: quoteResults[randomNum].content,
      author:
      quoteResults[randomNum].author == null ? "Unknown" : quoteResults[randomNum].author
    });
    this.randomColor();
  }
  
  render() {
    return (
      <div id="background">
        <div id="container">
          <div id="quote-box">
            <p id="text"> <FontAwesomeIcon icon = {faQuoteLeft} size = "xs"/> {this.state.quote} <FontAwesomeIcon icon = {faQuoteRight} size = "xs"/></p>
            <p id="author">- {this.state.author}</p>
            <div id="buttons">
              <a
                href="twitter.com/intent/tweet"
                title="Tweet this quote!"
                onClick={this.tweetQuote}
                target="_top"
                id="tweet-quote"
              >
                <FontAwesomeIcon icon={faTwitter} className = "fa-twitter-square" />
              </a>
              <Button onClick={this.randomQuote} id="new-quote">
                New Quote
              </Button>
            </div>
          </div>
          <div id="credit">by <a target="_blank" href="https://github.com/kireshanth">Kireshanth 👨🏿‍💻</a></div>
        </div>
      </div>
    );
  }
}