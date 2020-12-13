import React,{useState,useEffect}  from 'react';
import {Button, Grid, Switch} from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './project.css';
import Progress from './ongoing_projects/Progressbar';
import Project from './Project';
import {db} from './firebase';
import firebase from 'firebase'





function Projects(){
    const [projects, setProjects] = useState([]);
    const [pname, setPname] = useState('');
    const [pdue_date, setPdue_date] = useState('');

    useEffect(() => {
        db.collection('projects').onSnapshot(snapshot =>{
            setProjects(snapshot.docs.map(doc => ({id : doc.data().timestamp,name: doc.data().name, due_date : doc.data().due_date})))
        })
    }, [])

    const AddProject = (event) => {
        event.preventDefault();
        db.collection('projects').doc(pname).set({
            name :pname,
            due_date : pdue_date ,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setPname('')
        setPdue_date('')
    }

    const popupfrom ={
        display : 'Flex',
        color : 'red',
        flexDirection : 'column',
        margin :20
    }

    const popuplabel = {
        margin :20,
        width : 'auto',
    }

    const popupinput = {
        margin :5,
        width : 'auto',
    }

    return (
        <div>
            <Popup trigger={<Button  color='primary' variant='contained'> New Project</Button>} modal >
                <div className='addpopup'>
                    <form style={popupfrom}>
                        <Button type='submit' onClick={AddProject} color='primary' variant='contained'>Add Projects</Button>
                        <label style={popuplabel}>Enter project Name:
                            <input style={popupinput} value={pname} onChange={event => setPname(event.target.value)} />
                        </label>
                        <label style={popuplabel}>Enter Due Date:
                            <input style={popupinput} value={pdue_date} onChange={event => setPdue_date(event.target.value)} />
                        </label>
                        
                    </form>
                </div>
            </Popup>
            <Grid className='title' spacing={3} >
                <Grid item className='titleElements' xs={3} >
                    <p>project Name</p>
                </Grid>
                <Grid item className='titleElements' xs={1} >
                    <p>status</p>
                </Grid>
                <Grid item className='titleElements' xs={2} >
                    <p>due date</p>
                </Grid>
                <Grid item className='titleElements' xs={2} >
                    <p>blue print</p>
                </Grid>
                <Grid item className='titleElements' xs={2} >
                    <p>drive link</p>
                </Grid>
                <Grid item className='titleElements' xs={2} >
                    <p>Meet link</p>
                </Grid>
                <Grid item className='titleElements' xs={2} >
                    <p>online</p>
                </Grid>
            </Grid>

            {projects.map(project => <Project name={project} />)}
         
            
            
        </div>    
    
    );
}


export default Projects;
