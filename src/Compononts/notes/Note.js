import React from "react";

const Note =(props)=>{
    const {title , noteCliked,active}=props;
     return (
         <li className={`note-item ${active && 'active'}`} onClick={noteCliked}>{title}</li>
     )
}
export default Note;