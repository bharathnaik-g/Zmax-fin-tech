"use client"
import { createContext,useContext,useEffect,useState } from "react";
import{auth ,db } from"../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
const AuthContext = createContext(null);
export function AuthProvider({children}){
    //add profile data als to use crud in api context
    const [profileData , setProfileData]=useState(null);
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        let unsubProfile = null;
       
        const unsubscribeAuth =onAuthStateChanged(auth,(currentUser)=>{
             //
        if (unsubProfile) unsubProfile();
        //
            if(currentUser&&currentUser.emailVerified)
            {
                setUser(currentUser)
                const userDocRef=doc(db,"users",currentUser.uid);
                let  unsubProfile=onSnapshot(userDocRef,(docSnap)=>{
                    if(docSnap.exists()){
                        setProfileData(docSnap.data());
                    }
                });
               // return()=>unsubProfile();
                //setUser(currentUser);
            }else{
                setUser(null);
                setProfileData(null);
            }
            setLoading(false);
    });
    return()=>unsubscribe();
    //
    if (unsubProfile) unsubProfile();
    //
},[]);
    return(
        <AuthContext.Provider value={{user,profileData,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}