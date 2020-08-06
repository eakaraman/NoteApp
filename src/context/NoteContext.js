import React, { useReducer } from 'react';
import createNoteContext from './createNoteContext';

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'addNote':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'deleteNote':
      return state.filter((note) => note.id !== action.payload.id);
    default:
      return state;
  }
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

export const { Context, Provider } = createNoteContext(
  noteReducer,
  { addNote, deleteNote },
  [
    { id: 1, title: 'testpost', content: 'testPostcon' },
    { id: 2, title: 'testpost2', content: 'testPostcon2' },
  ]
);
