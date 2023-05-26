import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from "@mui/material/Avatar"
import { db } from './firebase';
import firebase from 'firebase/compat/app'

function Post({ user, postID, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        // let unsubscribe;
        if (postID) {
            // unsubscribe = 
            db.collection("posts")
                .doc(postID)
                .collection("comments")
                .orderBy('timestamp', "desc")
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()));

                });

        }
        // return () => {
        //     unsubscribe();
        // };

    }, [postID]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postID).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            // db is firebase.firestore()
        })
        setComment("");

    }

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post_avatar'
                    alt={"TestUserName"}
                    src="https://img.icons8.com/ios-glyphs/2x/apple-tv.png"
                />
                <h3>{username}</h3>
            </div>



            <img className='post__image' src={imageUrl} alt='' />
            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
            {/* <p> {username} {postID}</p> */}
            <div className='post__comments'>


                {
                    comments.map((comment) => (

                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }


            </div>

            {user && (
                <form className='post_commentBox'>
                    <input
                        className='post__input'
                        type='text'
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}

                    />

                    <button
                        className='post__button'
                        disabled={!comment}
                        type='submit'
                        onClick={postComment}
                    >Post</button>
                </form>
            )}


        </div>
    )
}

export default Post
