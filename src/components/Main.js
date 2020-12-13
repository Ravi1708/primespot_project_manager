import React,{useState} from 'react';
import { ListItemAvatar, Paper} from '@material-ui/core';
import logo from '../images/logo.png';
import './Main.css';
import Projects from './Projects';
import Tasks from './Tasks/Tasks';
import Note from './Notes/Note';
import ChatRoom from './ChatRoom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer,AppBar,Toolbar,List,Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ForumIcon from '@material-ui/icons/Forum';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
    Route,
    Link
} from "react-router-dom";
import {auth} from './firebase';
import firebase from 'firebase'


const drawerWidth = 240;




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    logo : {
     height : 70,
    }
  }));

  var user = null;
  var name, email, photoUrl, uid, emailVerified;
  



export default function Main() {
  const classes = useStyles();
  console.log(user);

  const [login, setLogin] = useState('login')
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      setLogin('logout')
    } if (user = '') {
      name = 'not signed in!'
      setLogin('login')
    }
  });

  return (
    <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <img className={classes.logo} src={logo} />
                  <Typography variant='h5' style={{marginLeft : 'auto',marginRight : 'auto'}}>Project Manager</Typography>
                  {(user ==null) ?
                    <Link to='SignIn'>
                      <Button color='secondary'variant='contained'>{login}</Button>
                    </Link>
                    :<Link to='SignIn'>
                      <Button color='secondary'  onClick={() => auth.signOut()} variant='contained'>{login}</Button>
                    </Link>
                  }
                    
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <img style={{borderRadius:'50%',width:'80%'}} src={photoUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={name}></ListItemText>
                    </ListItem>
                  </List>
                </div>
                <Divider />
                <List style={{marginTop:30}}>
                    <Link style={{textDecoration:'none'}} to='/'><ListItem button>
                        <ListItemIcon>< DeveloperModeIcon /></ListItemIcon>
                        <ListItemText primary='Projects' />
                    </ListItem></Link>

                    <Link style={{textDecoration:'none'}} to='/Tasks'><ListItem button>
                        <ListItemIcon>< ListAltIcon /> </ListItemIcon>
                        <ListItemText primary='Tasks' />
                    </ListItem></Link>
                    <Link style={{textDecoration:'none'}}  to='/ChatRoom'><ListItem button>
                        <ListItemIcon><ForumIcon/></ListItemIcon>
                        <ListItemText primary='Chat Room' />
                    </ListItem></Link>
                    <Link style={{textDecoration:'none'}} to='/Notes'><ListItem button>
                      <ListItemIcon><FileCopyIcon /></ListItemIcon>
                      <ListItemText primary='Notes' />
                    </ListItem></Link>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Paper className="main-content">                  
                  <Route exact path='/' component={Projects}>
                  </Route>
                  <Route path='/Tasks' component={Tasks}>
                  </Route>
                  <Route path='/ChatRoom' component={ChatRoom}>
                  </Route>
                  <Route path='/Notes' component={Note}>
                  </Route>
                </Paper>
            </main>
    </div>
  );
}






