// services/authService.js
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    onAuthStateChanged
  } from "firebase/auth";
  import { setDoc, doc, serverTimestamp } from "firebase/firestore";
  import { auth, db } from "../firebaseConfig";
  
  // Register a new user
  export const registerUser = async (email, password, userData) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with name
      await updateProfile(user, {
        displayName: userData.name
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: userData.name,
        email: userData.email,
        birthday: userData.birthday,
        lifeWord: userData.lifeWord,
        aiPersonality: userData.aiPersonality,
        title: userData.title || "My Journal",
        timezone: userData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      
      // Send email verification
      await sendEmailVerification(user);
      
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  
  // Sign in an existing user
  export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
  
  // Sign out the current user
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };
  
  // Reset password for an email
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };
  
  // Observe authentication state changes
  export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
  };