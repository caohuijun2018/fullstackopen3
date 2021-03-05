import React, { useState } from "react";
import Note from "./components/Node";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll,setShowAll] = useState();

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));   //将新添加的noteobject添加到notes，concat创建一个副本，不会直接改变原数组
    setNewNote('')
  };

  const notesShow = showAll ? notes : notes.filter(note => note.important === true)
  const handleNoteChange = (event) => {
    //记录下来表单输入的内容
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick = { () => setShowAll(!showAll)}> 
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesShow&&notesShow.map((note) => (
          <Note key={note.id} note={note} />
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
