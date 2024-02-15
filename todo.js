import React, { useState ,useRef,useEffect} from 'react';
import './todo.css';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
function Todo(){
    const[input,setInput]=useState('')
    const [dueDate, setDueDate] = useState('');
    const[inputs,setInputs]=useState([])
    const[editId,setEditID]=useState(0)
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    const addTodo = () =>{
        if(input!==''){
        setInputs([...inputs,{list:input,dueDate: dueDate,id:Date.now(),status:false}])
        console.log(inputs)
        setInput("");
        setDueDate('');
        }
        if(editId){
            const editinput=inputs.find((input)=>input.id===editId)
            const updatetodo=inputs.map((to)=>to.id===editinput.id
            ?(to={id : to.id , list: input})
            :(to={id :to.id , list: to.list}))
            setInputs(updatetodo)
            setEditID(0)
            setInput('')
        }
    }
    const inputRef = useRef('null')
    useEffect(()=>{
        inputRef.current.focus();
    }
    );
    const onDelete =(id)=>{
        setInputs(inputs.filter((to)=>to.id !==id))
    }
    const onComplete =(id)=>{
       let complete=inputs.map((list)=>{
        if(list.id===id){
          return({...list,status :!list.status})
        }
        return list
       })
       setInputs(complete)
    }
    const onEdit=(id)=>{
      const editinput = inputs.find((to)=>to.id ===id)
      setInput(editinput.list)
      setDueDate(editinput.dueDate);
      setEditID(editinput.id)
      console.log(editinput)
    }

    const sortedInputs = inputs.slice().sort((a, b) => {
        if (a.dueDate < b.dueDate) return -1;
        if (a.dueDate > b.dueDate) return 1;
        return 0;
    });

    return(
    
        <div className='container'>
        
            <h2>
                TODO APP
            </h2>
            <form className='formgroup' onSubmit={handleSubmit}>
                <input type="text" value={input}ref={inputRef} placeholder='Enter your todo list'className='form-control' onChange={(event)=>setInput(event.target.value)}/>
                <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                <button onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {
                        sortedInputs.map((to)=>(
                           <li className='list-items' key={to.id}>
                            <div className='list-item-list' id={to.status ?'list-item':''}>{to.list}</div>
                            <div>{to.dueDate}</div>
                           <span>
                            <IoMdDoneAll className="list-items-icons" id='complete' title='Complete'
                            onClick={()=>onComplete(to.id)}
                            />
                            <FiEdit className="list-items-icons" id='edit'title='Edit'
                            onClick={()=>onEdit(to.id)}
                            />
                            <MdDeleteForever className='list-items-icons' id='delete' title='Delete'
                            onClick={()=>onDelete(to.id)}
                            />
                           </span>
                           </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default Todo
