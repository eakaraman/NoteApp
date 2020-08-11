import React, { useReducer } from 'react';
import createNoteContext from './createNoteContext';

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'addNote':
      const id = generateID(state, Math.floor(Math.random() * 999999));
      const idString = id.toString(); // keyextractor string istiyor
      // console.log(idString.type);
      return [
        ...state,
        {
          id: idString,
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'deleteNote':
      return state.filter((note) => note.id !== action.payload.id);
    case 'editNote':
      return state.map((note) => {
        return note.id === action.payload.id ? action.payload : note; ///check here again
      });
    default:
      return state;
  }
};

const generateID = (state, id) => {
  const map = state.map((note) => {
    return note.id === id;
  });
  if (map.includes(true)) return generateID(state, id + 1);
  //duplicate id
  else return id;
};

const addNote = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: 'addNote', payload: { title, content } });
    if (callback) callback();
  };
};

const deleteNote = (dispatch) => {
  return (id) => {
    dispatch({ type: 'deleteNote', payload: { id } });
  };
};

const editNote = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: 'editNote', payload: { id, title, content } });
    if (callback) callback();
  };
};

export const { Context, Provider } = createNoteContext(
  noteReducer,
  { addNote, deleteNote, editNote },
  [
    { id: '1', title: 'testpost', content: 'testPostcon' },
    { id: '2', title: 'testpost2', content: 'testPostcon2' },
  ]
);
