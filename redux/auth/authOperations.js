import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authSlice } from './authReducer';


export const signUpUser = ({login, email, password}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
       await updateProfile(auth.currentUser, {
            displayName: login,
        });
        
        const updatedUser = await auth.currentUser;
 
        dispatch(authSlice.actions.updateUserProfile({
            userId: updatedUser.uid, 
            login: updatedUser.displayName,
            email: updatedUser.email
            })
        )

    } catch (error) {
        console.log(error.message);
    }
}

export const signInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
       
    } catch (error) {
        console.log(error.message);
    }
}

export const signOutUser = () => async (dispatch, getState) => {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
        
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    await onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(authSlice.actions.updateUserProfile({
            userId: user.uid, 
            login: user.displayName,
            email: user.email
            }));
        dispatch(authSlice.actions.authStateChange({
            stateChange: true
        })    
        )
      }
     
    });
}

