import { useEffect, useState } from "react";
import './App.css'
import axios from 'axios'
const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);

  const [persons,setPersons] = useState([])
  
  useEffect( () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  },[])

  const [newName, setNewname] = useState("");
  const [newPhone, setNewphone] = useState("");
  const [filterName, setFiltername] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    const object = {
      //新添加的对象
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };
    persons.map((person) =>
      person.name === newName
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(object))
    );

    setNewname("");
    setNewphone("");
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
      <form > 
        filter show with{" "}
        <input value={filterName} onChange={handleChangeFilter}  className = 'input-test'/>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons
        .filter((person) =>
          filterName
            ? person.name.toLowerCase().includes(filterName.toLowerCase()) 
            : true
        )
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.phone}
          </p>
        ))}
    </div>
  );
};

export default App;
