import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = (props) => {
  const point = new Array(props.anecdotes.length).fill(0); //创建一个制定长度的，填充零的数组
  let [selected, setSelected] = useState(0);
  const [votes, setvotes] = useState(point);
  //const[mosts, setMost] = useState(0);
  let mostSlected = votes.indexOf(Math.max(...votes)); //注意这里是(...votes)  寻找数组中最大项的下标
  //console.log(mostSlected)

  //const n = props.anecdotes.length - 1;



  const upVote = () => {
    let copy = [...votes];
    copy[selected]++;
    setvotes(copy);
  };
  const handleClick = () => {
      setSelected(Math.floor(Math.random() * 6))  //产生 0-5的随机数
    // setSelected(selected < n ? selected + 1 : (selected = 0)); //当4 < 5 时，selected++变为5，此时的selected为5，数组的所有元素都遍历结束了，所以此时应该置seleced为0
  };

  // const findMost = () => {
  //   let most = votes.indexOf(Math.max([...votes]))
  //   setMost(most);
  // }

  return (
    <div>
      <h1>Anendotes Of Day</h1>
      {props.anecdotes[selected]}
      <p> has {votes[selected]} votes</p>

      <p>
        <Button handleClick={upVote} text="vote" />
        <Button handleClick={handleClick} text="next anecdotes" />
      </p>
      <h1>Anecsotes Of Most</h1>
      <p>{props.anecdotes[mostSlected]}</p>
      <p>has {votes[mostSlected]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
