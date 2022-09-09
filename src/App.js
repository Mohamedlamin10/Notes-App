import logo from './logo.svg';
import './App.css';

 import 'bootstrap-icons/font/bootstrap-icons.css';
// إستيراد الخطاف useState من مكتبة React
import React, {useState, useEffect} from 'react';
import Preview from './Compononts/Preview';
import Message from './Compononts/message';
import NotesContainer from './Compononts/notes';
import NoteList from './Compononts/notes/NoteList';
import Note from './Compononts/notes/Note';
import Noteform from './Compononts/notes/NoteForm';

function App() {
//تعريف الحالات الابتدائية التي يحتاجها التطبيق مع تعيين القيمة الابتدائية لكل حالة 

  const [notes , setNotes]=useState([]);
const [title , setTitle]=useState('');
const [content, setContent]=useState('');
const[selectedNote,setSelected]=useState(null);
const [creating, setCreating]=useState(false);
const[editing,setEdit]=useState(false);
const [validationErorors ,setValidation]=useState([]);


useEffect(()=>{
if (localStorage.getItem('notes')){
  setNotes(JSON.parse(localStorage.getItem('notes')));
// الدالة parse لتحويل المصفوفوة من قيمة نصية إلى كائن جافاسكريبت
}else {
  localStorage.setItem('notes',JSON.stringify([]));
  // الدالة stringifyلتحويل من كائن جافا سكريبت إلى قيمة نصية 
}

},[]);


const savetoLcalStorage=(key,value)=>{
  localStorage.setItem(key,JSON.stringify(value));
}

const validate=()=>{
  const validationError=[];
  let passed =true;
  if (!title){
    validationError.push("الرجاء إدخال عنوان الملاحظة ");
    passed=false;

  }
  if(!content){
    validationError.push("الرجاء إدخال محتولى الملاحظة ")
  passed=false;
  }
setValidation(validationError);
return passed;
}

// تغيير عنوان الملاحظة 
const changeTiltleHandelr =(event)=>{
  setTitle(event.target.value);

}
// تغيير نص الملاحظة  
const changeContentHandelr=(event)=>{
    setContent(event.target.value);
}

//حفظ الملاحظة 
const saveNoteHandelr =()=>{

  if (!validate()) return ;
  const note ={
    id: new Date(),
    title:title,
    content:content
  }
  const updateNotes =[...notes,note];
  savetoLcalStorage(notes,updateNotes);
  //مصفوفة للملاحظات القديمة في الخطاف مع الملاحظة المدخلة الجديدة 
  setNotes(updateNotes);
  setCreating(false);
  setSelected(note.id);
  setTitle('');
  setContent('');

}
// اختيار ملاحظة 
const selectedNoteHandelr =NoteId=>{
      setSelected(NoteId);
      setCreating(false);
      setEdit(false);
      
}
//تعديل ملاحظة
const EditNothandelr=()=>{
   const note=notes.find(note=>note.id===selectedNote);
   setEdit(true);
   setTitle(note.title);
   setContent(note.content);
   setTitle('');
   setContent('');
  

}
//حفظ تعديل ملاحظة 
const updateNoteHadelr =()=>{
    if (!validate()) return ;
  const Ubdatesnots= [...notes];
  const noteindex = notes.findIndex(note=>note.id===selectedNote);
 //تعديل الملاحظة حسب المعرف المحدد
  Ubdatesnots[noteindex]={
    id:selectedNote,
    title:title,
    content:content
  }
  savetoLcalStorage('notes',Ubdatesnots);
  //نحدث القائمة الجديدة للملاحظات 
  setNotes(Ubdatesnots);
  setTitle('');
  setContent('');
  setEdit(false);

}
//خذف ملاحظة 
const deletNote =()=>{
  const Updatenotes =[...notes];
  const noteindex= notes.findIndex(note=>note.id===selectedNote);
  notes.splice(noteindex,1);
  savetoLcalStorage('notes',Updatenotes);
  // الوسيط الاول هو المعرف الذي نريد حذفه من المصفوفة والوسيط الاخر يمثل عدد العناصر التي نريد حذفها بداية من المعرف المحدد
  setNotes(notes);
  setSelected(null);


}
  const getAddNote = () => {
    return (
      <Noteform formTitle="ملاحظة جديدة "
      title={title}
      content={content}
      toltleChanged={changeTiltleHandelr}
      contentChanged={changeContentHandelr}
      submitText="save"
      submitCliked={saveNoteHandelr}

      >
      </Noteform>
    );
  };

  
    const GetPreview =()=>{
 if (notes.length==0){
   return <Message title="لايوجد ملاحظات "> </Message>
 }
 if(!selectedNote){
   return <Message title="الرجاء اختيار ملاحظة"> </Message>
 }
 const note = notes.find(note=>{
   return note.id===selectedNote ;
 });
 let notDisplay=(
   <div>
     <h2>{note.title}</h2>
     <p>{note.content}</p>
   </div>
 )
if(editing){
  notDisplay=(
    <Noteform formTitle="تعديل الملاحظة "
      title={title}
      content={content}
      toltleChanged={changeTiltleHandelr}
      contentChanged={changeContentHandelr}
      submitText="تعديل "
      submitCliked={updateNoteHadelr}

      >
      </Noteform>
  );
}
      return(


        <div className='note'>
        <div className='note-note'>
        {!editing &&  
            <div className="note-operations">
            <a className='fafa' href="#" onClick={deletNote}>
              <i className="bi bi-trash3-fill" />
            </a>
            <a className='fafa'href="#" onClick={EditNothandelr}>
              <i className="bi bi-pencil-square" />
            </a>
           </div>
           
        }
        </div>
        
        {notDisplay}
         
        </div>
       
      );

      

    }
    const addNotHandeler =()=>{
         setCreating(true);
         

    }
 return(
  <div className="App">
  <NotesContainer >
    <NoteList >
   {notes.map(note=> <Note 
    key={note.id} 
    title={note.title}
    noteCliked={()=>selectedNoteHandelr(note.id)}
    active={(selectedNote===note.id)}
      />  )}

    </NoteList>
    <button className="add-btn"  onClick={addNotHandeler}>+</button>
  </NotesContainer>
   <Preview>
  {creating ? getAddNote(): GetPreview()}

   </Preview>
   
 </div>
 );

}

export default App;
