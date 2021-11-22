import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
     const notesInitial = [
        {
          "_id": "61881739ce627c3fe6f33f9e",
          "user": "61842df08853ebbc25c2ae88",
          "title": "New Title",
          "description": "this is react js",
          "tag": "personal",
          "date": "2021-11-07T18:13:13.494Z",
          "__v": 0
        },
        {
          "_id": "6188173ace627c3fe6f33fa0",
          "user": "61842df08853ebbc25c2ae88",
          "title": "New Title",
          "description": "this is react js",
          "tag": "personal",
          "date": "2021-11-07T18:13:14.640Z",
          "__v": 0
        },
        {
          "_id": "6189f7357bbb0fdbe4c0d0b4",
          "user": "61842df08853ebbc25c2ae88",
          "title": "New Title",
          "description": "this is react js",
          "tag": "personal",
          "date": "2021-11-09T04:21:09.605Z",
          "__v": 0
        },
        {
          "_id": "6189f7367bbb0fdbe4c0d0b6",
          "user": "61842df08853ebbc25c2ae88",
          "title": "New Title",
          "description": "this is react js",
          "tag": "personal",
          "date": "2021-11-09T04:21:10.644Z",
          "__v": 0
        },
        {
          "_id": "6189f7377bbb0fdbe4c0d0b8",
          "user": "61842df08853ebbc25c2ae88",
          "title": "New Title",
          "description": "this is react js",
          "tag": "personal",
          "date": "2021-11-09T04:21:11.737Z",
          "__v": 0
        },
        {
          "_id": "618bdd4e18cbbd190f66c907",
          "user": "61842df08853ebbc25c2ae88",
          "title": "Now sher",
          "description": "this is react js facebook",
          "tag": "application",
          "date": "2021-11-10T14:55:10.193Z",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesInitial);
     return(
            <NoteContext.Provider value={{notes,setnotes}}>
                {props.children}
            </NoteContext.Provider>
     )
}

export default NoteState