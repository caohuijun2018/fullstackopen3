import React, { useState, useEffect } from "react";
import Note from "./components/Node";
//import axios from "axios";
import noteServices from "./services/note";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState();

  //const url = "http://localhost:3001/notes";

  useEffect(() => {
    console.log("effect");
    // 一；  axios
    //     .get(url).then((response) => {
    //     console.log("promised fulfilles");
    //     setNotes(response.data);
    //     console.log(response);
    //   });

    // 二： noteServices.getAll().then((response) => {
    //   setNotes(response.data);
    // });

    noteServices.getAll().then((initialNote) => {
      setNotes(initialNote);
    });
  }, []); //第二个参数的[],代表只在第一次渲染时执行

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    };
    // setNotes(notes.concat(noteObject)); //将新添加的noteobject添加到notes，concat创建一个副本，不会直接改变原数组
    // setNewNote("");

    // axios.post(url, noteObject).then((response) => {
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });

    // noteServices.create(noteObject).then((response) => {
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });

    noteServices.create(noteObject).then((initialNote) => {
      setNotes(notes.concat(initialNote));
      setNewNote("");
    });
  };

  const notesShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  const handleNoteChange = (event) => {
    //记录下来表单输入的内容
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportant = (id) => {
    //const url2 = `${url}/${id}`;

    const note = notes.find((note) => note.id === id);
    const changeNote = { ...note, important: !note.important };

    // axios.put(url2, changeNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });
    // noteServices.update(id, changeNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });
    noteServices
      .update(id, changeNote)
      .then((initialNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : initialNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);

        setNotes(() => note.filter((note) => note.id !== id));
      });
  };

  // const notedelete = id => {
  //   const note = notes.find(note => note.id === id)
  // }
 
  return (
    <div>
      <h1>Notes</h1>

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesShow &&
          notesShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportant={() => {
                toggleImportant(note.id);
              }}
            />
          ))}
         
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
