import React,{useState,useEffect}  from 'react';
import Calendar from 'react-calendar'
import {Button,FormControl, Grid,Select,Paper} from '@material-ui/core';
import {DropdownButton,Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './task.css';
import Task from './Task'
import {db} from '../firebase';
import firebase from 'firebase';


function Tasks() {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [Value,setValue]= useState('Projects');
    
    const [projects,setProjects] = useState([])


    useEffect(() => {
        db.collection('projects').onSnapshot(snapshot =>{
            setProjects(snapshot.docs.map(doc => ({name: doc.data().name, id : doc.data().timestamp})))
        })
    }, [])

    const id = Value
    useEffect(() => {
        db.collection('projects').doc(id).collection('todos').onSnapshot(snapshot =>{
            setTodos(snapshot.docs.map(doc => ({todo: doc.data().todo,doc_id:doc.id,project : doc.data().id})))
        })
    }, [id])

    const AddTodo = (event) => { 
        event.preventDefault();
        const id = Value
        db.collection('projects').doc(id).collection('todos').doc(input).set({
            todo: input,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            id : id
        })
        
        setInput('');
    }

    const handleSelect=(e)=>{
        console.log(e);
        setValue(e)
    }



    
    return (
        <div>
            <Grid container spacing={2} style={{marginTop:10}}>
                <Grid  item xs={6}>
                    <DropdownButton
                        alignRight
                        title={Value}
                        style={{marginLeft : 50}}
                        className='task-dropdown'
                        onSelect={handleSelect}
                        >
                            {projects.map(project => <Dropdown.Item Selected={project.name} eventKey={project.name}>{project.name}</Dropdown.Item>)}
                            
                    </DropdownButton>
                </Grid>

                <Grid item xs={6}>
                    <form className='form'>
                        <input value={input} onChange={event => setInput(event.target.value)}/>
                        <Button type='submit'  onClick={AddTodo} variant="contained" color="primary">
                        Add Todo
                        </Button>
                        
                    </form>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{marginTop:10}}>
                    
                <Grid  item xs={4}>
                        
                    <Calendar />
                
                </Grid>
                <Grid  item xs={8}>
                    <Paper style={{overflow:'scroll'}} className='content'>
                        
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
                        {todos.map(todo => <Task task={todo} />)}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
    
}

export default Tasks;
