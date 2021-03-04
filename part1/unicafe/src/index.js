import { React, useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.handleCkick}>{props.text}</button>;
};

const Calculate = (props) => {
  let sum = props.good + props.neutral + props.bad;
  let average = props.good - props.bad;
  let positive = 0;
  if (average !== 0) {
    positive = props.good / average / 100;
  }
  return (
    <div>
      <table>
        <tr>
          <p>sum {sum}</p>
        </tr>
        <tr>
          <p>average {average}</p>
        </tr>
        <tr>
          <p>positive {positive} %</p>
        </tr>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  return (
    <div>
      <p>code here</p>
      <h1>give feedback</h1>
      <Button handleCkick={() => setGood(good + 1)} text="good" />
      <Button handleCkick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleCkick={() => setBad(bad + 1)} text="bad" />
      <h1>statics</h1>
      {all === 0 ? (
        <p>no feedback five</p>
      ) : (
        <table>
          <tr>good{good}</tr>
          <tr>neutral {neutral}</tr>
          <tr>neutral {neutral}</tr>
          <tr>bad {bad}</tr>
          <Calculate good={good} neutral={neutral} bad={bad} />{" "}
        </table>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
