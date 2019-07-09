import app from 'firebase/app'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyCY3WXhUaCOelSWUlrKEoIgQcsK_KPTf8s",
    authDomain: "test-bcd7a.firebaseapp.com",
    databaseURL: "https://test-bcd7a.firebaseio.com",
    projectId: "test-bcd7a",
    storageBucket: "test-bcd7a.appspot.com",
    messagingSenderId: "687879184134",
    appId: "1:687879184134:web:d2dee75e183a822e"
  };
class Firebase{
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
}
export default Firebase;