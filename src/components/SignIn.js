import React,{useState} from 'react'
import {Paper,Button} from '@material-ui/core'
import logo from '../images/logo.png';
import firebase from 'firebase'
import {auth} from './firebase';
import { useHistory } from 'react-router-dom';

function SignIn() {

    const history = useHistory();
    const provider = new firebase.auth.GoogleAuthProvider();


    provider.setCustomParameters({  promt: "select_account",});
    const signInWithGoogle = () =>{    auth.signInWithPopup(provider).then((auth)=>{ if (auth){
        history.push('/')
        }})
    };

    const styles = {
        height : 300,
        width : 300,
        display : 'flex',
        flexGrow: 1,
        flexDirection : 'column',
        backgroundColor : 'powderBlue',
        margin :  'auto',
        marginLeft :'auto',
        marginTop : 50,
        justifyContent : 'center'
    }

    

    return (
        <div>
            <Paper style={styles}>
                <img className="logo" src={logo} alt="logo" />
                <form>
                    <Button style={{margin:30}} onClick={signInWithGoogle} varient='contained' color='danger'>signin with google</Button>
                </form>
            </Paper>
        </div>
    )
}

export default SignIn
