import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged,
} from "firebase/auth";
export async function createAccount(email, password) {
    try{
        const  userCredential=await createUserWithEmailAndPassword(auth,email,password);
        //sending verification mail once account is created 
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        //return true;
       // Return the whole credential so your Signup Page 
        // can use userCredential.user.uid to save the Name to Firestore!
        return userCredential;
    }catch(error){
        console.log("Signup error:", error.message);
        throw error;
    }
    }
export async function Login(email, password) {
    try{
        const  userCredential=await signInWithEmailAndPassword(auth,email,password);
        // check if email is verified by firebase of no dont allow to go to dassh bord
        const user =userCredential.user;
        //commented above line because rather than returning true return just user credential
      
        if(!user.emailVerified){
            await signOut(auth);
            throw new Error("Please verify your email");
        }
        return user;
        
       
        return userCredential.user;
    }catch(error){
        console.log("Error logging in:", error.message);
        throw error;
    }
    }
    export async function logout(email, password) {
    try{
        await signOut(auth);
        return null;
    }catch(error){
        console.log("Error logging out:", error.message);
        throw error;
    }
    }
    export async function resetEmail(email) {
        try{
            await sendPasswordResetEmail(auth,email);
            return true;
        }catch(error){
            console.log("Error creating account:", error);
            return false;
        }
    }
    
