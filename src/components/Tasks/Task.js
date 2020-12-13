import React,{useState} from 'react'
import {Checkbox,TextField,Grid, Button} from '@material-ui/core';
import './task.css';
import { db } from '../firebase';
import { TextRotationDownSharp } from '@material-ui/icons';



{/* const handleChange = (event) => {
  setChecked(event.target.checked);
  db.collection('projects').doc().collection('todos').doc(props.task.id).delete();
}; */}

function Task(props){
    const [checked, setChecked] = useState(false);
    return(
        <Grid style={{borderBottom:'1px solid black'}} className='task'>
            <Grid style={{marginLeft:'5px',marginTop:'10px'}} item className='titleelements' xs={4} >
                <p >{props.task.todo}</p>
            </Grid>
            <Grid item className='titleelements' xs={3} >
            <Checkbox color="primary" checked={checked} onChange={event =>{setChecked(event.target.checked); db.collection('projects').doc(props.task.project).collection('todos').doc(props.task.doc_id).delete()}} className='checkbox'></Checkbox>
            </Grid>
            <Grid item className='titleelements' xs={2}>
                <Checkbox color="primary" className='checkbox'/>            
            </Grid>
            <Grid item className='titleelements' xs={4}>
                <TextField />
            </Grid>
        </Grid>
    )
}

export default Task;