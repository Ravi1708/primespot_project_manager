import React ,{useState,useEffect} from  'react';
import {Grid,Button} from '@material-ui/core';
import './task.css';
import Task from './Task'
import db from '../firebase';
import firebase from 'firebase';



function Sidebartask() {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        db.collection('projects').doc('habc7fKp7ycLnM7elQvQ').collection('todos').onSnapshot(snapshot =>{
            setTodos(snapshot.docs.map(doc => ({todo: doc.data().todo})))
        })
    }, [])
   
    const AddTodo = (event) => { 
        event.preventDefault();

        db.collection('projects').doc('habc7fKp7ycLnM7elQvQ').collection('todos').add({
            todo: input,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        
        setInput('');
    }

    return (   
        <div>
            <form className='form'>
                <input value={input} onChange={event => setInput(event.target.value)}/>
                <Button type='submit'  onClick={AddTodo} variant="contained" color="primary">
                Add Todo
                </Button>
                
            </form>
            <Grid className='tasktitle'>
                <Grid item className='titleelements' xs={4} >
                    <p>Task</p>
                </Grid>
                <Grid item className='titleelements' xs={3} >
                    <p>Done</p>
                </Grid>
                <Grid item className='titleelements' xs={2}>
                    <p>Working</p>
                </Grid>
                <Grid item className='titleelements' xs={4}>
                    <p>Description</p>
                </Grid>
            </Grid>
            {todos.map(todo => <Task task={todo.todo} />)}
            
                
        </div>
    );
}
export default Sidebartask;