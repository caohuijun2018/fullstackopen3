//import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
//import axios from "axios";
import phoneBookService from "./service/phoneboook";
//const url = "http://localhost:3001/persons";
const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phoneBookService.getAll().then((returnPerson) => {
      setPersons(returnPerson);
    });
  }, []);
  const [newName, setNewname] = useState("");
  const [newPhone, setNewphone] = useState("");
  const [filterName, setFiltername] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const object = {
      //新添加的对象
      name: newName,
      number: newPhone,
      //id: persons.length + 1,   //id要自动生成
    };
    const alreadyExit = persons.some((person) => person.name === object.name); //some返回一bollean型数据
    if (alreadyExit) {
      alert(`${newName} is already exited`);
      const phonePerson = persons.find(
        //找到需要被替代的人
        (person) => person.name === newName && person.phone !== newPhone
      );

      const changePerson = { ...phonePerson, number: newPhone }; //新的对象

      if (phonePerson !== null) {
        //upatePhone({ ...object, id:phonePerson.id });
        //这里要注意，在更新电话号码的时候，id仍然为persons中已经存在的人的id，只是将新的电话号码更新到原先的id对应的人下
        let flag = window.confirm(
          `${newName} is already exited,do you want to replace it?`
        );
        
        if (flag === true) {
          upClick(changePerson);
        }
      }
    } else {
      phoneBookService
        .create(object)
        .then((returnPerson) => setPersons(persons.concat(returnPerson)));
    }
    setNewname("");
    setNewphone("");
  };

  const upClick = (changePerson) => {
    phoneBookService
      .updata(changePerson, changePerson.id)
      .then((returnPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === changePerson.id ? returnPerson : person
          )
        );
      });
  };

  const delPerson = (person) => {
    let flag = window.confirm(`Delete ${person.name} ?`);
    if (flag) {
      phoneBookService.deleteId(person.id).then(() => {
        phoneBookService
          .getAll()
          .then((returnPerson) => setPersons(returnPerson));
      });
      // axios.delete(`http://localhost:3001/persons/${person.id}`).then(() => {
      //   phoneBookService.getAll()
      //   .then((response) => setPersons(response));

      //   // let filtedPerson = persons.filter((target) => target.id !== person.id);
      //   // setPersons(filtedPerson);
      // });
    }
  };
  const handleChangeName = (event) => {
    setNewname(event.target.value);
  };
  const handleChangePhone = (event) => {
    setNewphone(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFiltername(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h1>Test</h1>
      <form>
        filter show with{" "}
        <input
          value={filterName}
          onChange={handleChangeFilter}
          className="input-test"
        />
      </form>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
          number: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons &&
        persons
          .filter((person) =>
            filterName
              ? person.name.toLowerCase().includes(filterName.toLowerCase())
              : true
          )
          .map((person) => (
            <div>
              <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => delPerson(person)}>delete</button>
              </p>
            </div>
          ))}
    </div>
  );
};

export default App;
