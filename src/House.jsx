import React, { useState } from "react";

export default function House() {
  const [move, setMove] = useState(false);
  const [innerValue, setInnerValue] = useState(null);

  const timePerFloor = 1000;
  let floorsTriggered = [];

  function elevate(floor) {
    floorsTriggered.push(floor);

    return new Promise((resolve, reject) => {
      const timeRequired = floor * timePerFloor;

      setTimeout(resolve, timeRequired, floor);
    });
  }

  const go = (e) => {
    if (!move) {
      setInnerValue(e.target.innerText);
      setMove(true);
    } else {
      elevate(e.target.innerText).then((value) => {
        setInnerValue(value);
      });
    }
  };

  const myStyle = {
    div: {
      width: "50px",
      height: "50px",
      background: "blue",
      transition: `${innerValue * 1}s`,
      transform: `translateY(${innerValue * -60}px)`,
    },
    div2: {
      width: "50px",
      height: "50px",
      background: "blue",
      transition: "2s",
    },
  };
  const arr = [];
  for (let i = 9; i >= 0; i--) {
    arr.push(i);
  }

  return (
    <div className="wrapper">
      <div className="home">
        <div className="left-side">
          {arr.map((el) => {
            return (
              <div key={el} className="window">
                {el}
              </div>
            );
          })}
        </div>
        <div className="elevator">
          <div style={move ? myStyle.div : myStyle.div2}></div>
        </div>
        <div className="right-side">
          {arr.map((el) => {
            return (
              <div key={el} className="button" onClick={go}>
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
