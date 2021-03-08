import React from "react";

const Note = ({ note, toggleImportant }) => {
  const lable = note.important ? 'make not important' : 'make important'
  return (
    <div>
      <li>
        {note.content}
        
      </li>
    </div>
  );
};

export default Note;
