import React, { useReducer } from 'react';
import createNoteContext from './createNoteContext';

const noteReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createNoteContext(noteReducer, {}, [
  { title: 'testpost', content: 'testPostcon' },
]);
