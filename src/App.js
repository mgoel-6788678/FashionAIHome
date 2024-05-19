// import Home from "./pages/home/Home.js"
//
// function App() {
//   return <Home/>
// }
//
// export default App;
import './App.css';
import React from 'react';
import image from './img/robo_img.jpeg'
import { useState, useRef } from "react"; 
function App() {

  const humanMessage = useRef();
  const botmessage = useRef();
  const input = useRef();

  const date = new Date();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [time, setTime] = useState(`${hours}:${seconds}`); //using the useState hook to get the data from the local time and set it to the time variable
  const [dateTime, setDateTime] = useState(
    `${days[day]}, ${months[month]} ${year}`
  ); //using the useState hook to get the data from the local date and set it to the dateTime variable


  const checkStatus = (e) => {
    let isActive = true;
    
    const status = document.querySelector(".status");
    // selecting the status class
    if (isActive === true) {
      //if the bot is active
      status.innerHTML = "Active";
      status.style.color = "green";
    } else {
      status.innerHTML = "Not Active";
      status.style.color = "red";
    }
  };
  
  const handleInput = async () => {
    const botMessage = document.querySelector("#message1");
    const userMessage = document.querySelector("#message2");
    const inputRef = input.current;
    const getHumanMessage = humanMessage.current;
    const getBotMessage = botmessage.current;

    // let how = [
    //   "hi"
    // ];
    // let words = new RegExp(how);
    // if (words.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Searching...";
      console.log(inputRef.value);
      
      const options = {
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'query': inputRef.value}),
      };
      setTimeout(() => {
        // getBotMessage.innerText = "I am fine, thank you";
        // botMessage.innerHTML = '<img src="' + image + '" alt="Robo Image" style="width: 100px; height: auto;"/>';
      fetch("https://faiserver.azurewebsites.net/", options).then(response => response.json())
        .then(data=> {
          console.log("Got data:",data.data)
          // const urls = JSON.parse(data.data)
          // console.log(`Got urls: ${urls}`)
          // console.log(`space split: ${JSON.stringify(urls).split(/\s+/)}`)
          // const stringlisturls = JSON.stringify(urls).split(/\s+/)
          // botMessage.innerHTML = '<img src="' + urls + '" alt="Robo Image" style="width: inherit; height: auto;"/>';
          botMessage.innerHTML = `<img src="${data.data}" alt="Robo Image" style="width: inherit; height: auto;"/>`;
          console.log(botMessage.innerHTML)
          // onimgdatachange({...imgdata, text: urls})
        }).catch(error => {
            console.log("Error: ",error);
        })
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = ""; // clear the input
      }, 2000);
    // }
    
    getHumanMessage.innerText = inputRef.value; // display the message
  };
  return (
    <div className="App" onLoad={checkStatus}>
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
              <img src={image} alt="" />
            </div>
            <div className="right">
              <div className="name">FashionAI</div>
              <div className="status">Active</div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div
                  className="bot-message"
                  id="message1"
                  ref={botmessage}
                ></div>
                <div
                  className="human-message"
                  id="message2"
                  ref={humanMessage}
                ></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="input">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  ref={input}
                />
              </div>
              <div className="btn">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
