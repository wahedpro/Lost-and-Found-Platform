import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";
export const authContext = createContext();

const AuthProvider = ({ children }) => {

    const googleAuthProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // this is for create a new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // this is for login user 
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };


    const LoginWithGoogle = () => {
        return signInWithPopup(auth, googleAuthProvider);
    };

    const manageProfile = (name, images) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: images,
        });
    };

    const logoutUser = () => {
        return signOut(auth);
    };

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logoutUser,
        LoginWithGoogle,
        manageProfile,
        loading,
    };

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser?.email) {
            const user = { email: currentUser.email };
            axios.post('https://where-is-it-server-six.vercel.app/jwt', user, { withCredentials: true })
        } else {
            axios.post('https://where-is-it-server-six.vercel.app/logout', {}, { withCredentials: true })
        }
        setLoading(false);
    });

    return () => unsubscribe();
}, []);




    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    
    //         if (currentUser?.email) {
    //             const user = { email: currentUser.email };
    //             axios.post('https://where-is-it-server-six.vercel.app/jwt', user, { withCredentials: true })
    //                 .then(res => console.log("JWT token set:", res.data))
    //                 .catch(err => console.error("JWT error:", err));
    //         } else {
    //             axios.post('https://where-is-it-server-six.vercel.app/logout', {}, { withCredentials: true })
    //                 .then(res => console.log("Logout success:", res.data))
    //                 .catch(err => console.error("Logout error:", err));
    //         }
    //         setLoading(false);
    //     });
    
    //     return () => unsubscribe();
    // }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6666F2]"></div>
            </div>
        );
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;