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

export const { Context, Provider } = createNoteContext(
  noteReducer,
  { addNote },
  [{ id: 1, title: 'testpost', content: 'testPostcon' }]
);
