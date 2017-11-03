import React from 'react';

function Square(props) {
    return (
      <button id={props.id} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square;