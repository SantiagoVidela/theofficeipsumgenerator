import "./main.css"
import {  useState, useEffect } from "react";
import dwight from "../../assets/dwight.jpg"
import jim from "../../assets/jim.jpg"
import michael from "../../assets/michael.png"
import andy from "../../assets/andy.jpeg"
import creed from "../../assets/creed.jpeg"
import kevin from "../../assets/kevin.png"
import angela from "../../assets/angela.jpeg"
import oscar from "../../assets/oscar.jpeg"
import pam from "../../assets/pam.jpeg"
import ryan from "../../assets/ryan.png"
import toby from "../../assets/toby.jpeg"
import axios from "axios";

const Main = () => {
    
    const [state, setState] = useState([])
    const [length, setLength] = useState(3)
    const [randomImage, setRandomImage] = useState(dwight)
    

    useEffect(() => {
      let imagesArray = [dwight, jim, michael, andy, creed, kevin, angela, oscar, pam, ryan ,toby]
      const loop = setInterval(() => {
        setRandomImage(imagesArray[Math.floor(Math.random() * 10) + 1])
      }, 3000)
      return function cleanup() {
        clearInterval(loop)
      };
    },[]);
    
    const onChange = (e) => {
        setLength(e.target.value)
    }

    const getRandomQuote = (array, x) => {
        let randoms = []
        while(randoms.length < x) {
            randoms.push(array[Math.floor(Math.random() * array.length)])
            randoms = [...new Set(randoms)]
        }
        return randoms
    }

    const onSubmit = (e) => {
        e.preventDefault();
        return axios.get("https://officeapi.dev/api/quotes").then(response => {
            let res = getRandomQuote(response.data.data, length)
            setState(res)
            return res
        }).catch(error => {console.log(error)})
    }

    return (
      <>
        <div className="container">
          <div className="aboutme">
          {console.log("Hi, follow me on twitter! @santiagocode")}
            <div className="me">
              Made by{" "}
              <a
                href="https://twitter.com/santiagocode"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                me
              </a>
              <div>
                Inspired by{" "}
                <a
                  href="https://jeffsum.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Jeffsum
                </a>
              </div>
              <div>
                API by{" "}
                <a
                  href="https://www.officeapi.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  officeapi
                </a>
              </div>
            </div>
          </div>
          <div className="title">
            <p className="theoffice">THE OFFICE IPSUM</p>
            <p>Get your The Office quotes for your project (or just for fun)</p>
          </div>
          <div className="img">
              <img src={randomImage} alt="theoffice" />
          </div>
          <div className="input">
            <div className="inputdiv">
              <div className="giveme">Give me</div>
              <input
                type="number"
                value={length}
                min="1"
                max="8"
                onChange={onChange}
              />
              <div className="giveme">quote(s) from The Office</div>
              <button onClick={onSubmit}>RECEIVE</button>
            </div>
          </div>
          <div className="quotes">
            {state ? (
              state.map((quote) => (
                <p className="quote" key={state.id}>
                  {quote.content}
                </p>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </>
    );
}

export default Main;

