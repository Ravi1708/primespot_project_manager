import React  from 'react';
import {Button, Grid, Switch} from '@material-ui/core';
import './project.css';
import Progress from './ongoing_projects/Progressbar';


function Project(props) {
    return (
        <Grid className='project' spacing={3} >
            <Grid item className='titleElements' xs={3} >
                <p>{props.name.name}</p>
            </Grid>
            <Grid item className='titleElements' xs={1} >
                <Progress />
            </Grid>
            <Grid item className='titleElements' xs={2} >
                <p>{props.name.due_date}</p>
            </Grid>
            <Grid item className='titleElements' xs={2} >
                <Button>view</Button>
            </Grid>
            <Grid item className='titleElements' xs={2} >
                <a href='#'>link</a>
            </Grid>
            <Grid item className='titleElements' xs={2} >
                <a href='#' > link</a>
            </Grid>
            <Grid item className='titleElements' xs={2} >
                <Switch />
            </Grid>
        </Grid>
    
    );

}
export default Project;