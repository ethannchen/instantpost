import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { Box, Button, Modal, Input, Typography } from '@mui/material';
import ImageUpload from './ImageUpload';
import { InstagramEmbed } from 'react-social-media-embed';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message)); //backend validation

    setOpen(false); // close Modal
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  // useEffect Runs a piece of code based on a specific condition
  useEffect(() => { // run everytime the variable posts changes
    // posts from firebase
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // onSnapshot: every time a new post is added, this code fires
      // backend listener
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);// run it once when the page refreshes 


  // front-end listener: refire, fire this off
  useEffect(() => {
    // backend listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser); // keeps you login
      } else {
        // user has logged out
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);




  return (
    <div className="app">

      {/* sign up */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}

          <form className='app__signup'>
            <center>
              {/* <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="" /> */}
              
            </center>
            <div className="h1">Instant Post</div>

            <Input
              type="text"
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>

        </Box>
      </Modal>



      {/* sign in */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>

          <form className='app__signup'>
            <center>
              {/* <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="" /> */}
              
            </center>
            <div className="h1">Instant Post</div>

            
            <Input
              type="text"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>

        </Box>
      </Modal>



      <div className="app__header">
        <div className="h1">Instant Post</div>
        {/* <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="" /> */}
        {user ? (
          <div className='app__loggedin'>
          <Typography variant="button" > {user.displayName} </Typography>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </div>

          
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>

        )}
      </div>



      <div className='app__posts'>
        <div className='app_postsLeft'>
          {/* avoid refreshing all post */}

          {posts.map(({ id, post }) =>
          (
            <Post key={id} postID={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />

          ))}

        </div>
        

        <div className='app_postsRight'>


        <div className="app__upload">
            {
            user?.displayName ? (// optional 
              <ImageUpload username={user.displayName} />

            ) : (
              
                <><h3>Please login to upload image.</h3><br/></>
              
              
            )
            }

        </div>

        




          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InstagramEmbed url="https://www.instagram.com/p/CsoNyr3sGoX/" width={328} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InstagramEmbed url="https://www.instagram.com/p/CsrhM4rSnG_/" width={328} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InstagramEmbed url="https://www.instagram.com/p/Csp2XOBosnq/" width={328} />
          </div>
        </div>

      </div>




      
    </div>



  );
}

export default App;
