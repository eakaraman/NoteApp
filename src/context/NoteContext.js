import React, { useReducer, useState } from 'react';
import createNoteContext from './createNoteContext';
import firebase from 'firebase';

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'addNote':
      const id = generateID(state, Math.floor(Math.random() * 999999));
      const idString = id.toString(); // keyextractor string istiyor
      updateDatabase(idString, action.payload.title, action.payload.content);
      // console.log(idString.type);
      return [
        ...state,
        {
          id: idString,
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'updateFromDatabase':
      const user = firebase.auth().currentUser;
      const temp = [];
      firebase
        .database()
        .ref('users/' + user.uid + '/data')
        .once('value')
        .then((snapshot) => {
          const obj = snapshot.val();

          for (let [key, value] of Object.entries(obj)) {
            // temp = [
            //   ...temp,
            //   { id: key, title: value.title, content: value.content }, //sıkıntı
            // ];
            temp.push({ id: key, title: value.title, content: value.content });
            console.log(`${key} : ${value}`);
          }

          // console.log(title); //we get the object
        })
        .then(() => console.log('then'));
      return temp;
    case 'deleteNote':
      deleteFromDatabase(action.payload.id);
      return state.filter((note) => note.id !== action.payload.id);
    case 'editNote':
      updateDatabase(
        action.payload.id,
        action.payload.title,
        action.payload.content
      );
      return state.map((note) => {
        return note.id === action.payload.id ? action.payload : note; ///check here again
      });
    default:
      return state;
  }
};

// const matchDatabase = () => {
//   if (firebase.auth().currentUser) {
//     const user = firebase.auth().currentUser;
//       { id: 6, title: 'inside', content: 'insidecontent' },
//     ]);
//     firebase
//       .database()
//       .ref('users/' + user.uid + '/data')
//       .once('value')
//       .then((snapshot) => {
//         const obj = snapshot.val();

//         for (let [key, value] of Object.entries(obj)) {
//           setState([
//             ...state,
//             { id: key, title: value.title, content: value.content },
//           ]);
//           console.log(`${key} : ${value}`);
//         }

//         // console.log(title); //we get the object
//       });
//     return state;
//   }
// };

const deleteFromDatabase = (id) => {
  const user = firebase.auth().currentUser;
  firebase
    .database()
    .ref('users/' + user.uid + '/' + 'data/' + id)
    .remove();
};

const updateDatabase = (id, title, content) => {
  const user = firebase.auth().currentUser;
  firebase
    .database()
    .ref('users/' + user.uid + '/' + 'data/' + id)
    .update({
      title,
      content,
    });
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
const updateFromDatabase = (dispatch) => {
  return () => {
    dispatch({ type: 'updateFromDatabase', payload: {} });
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
  { addNote, deleteNote, editNote, updateFromDatabase },
  [
    { id: '1', title: 'testpost', content: 'testPostcon' },
    { id: '2', title: 'testpost2', content: 'testPostcon2' },
  ]
);
