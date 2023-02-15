import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import service_account from "../service_account.json"  assert{type:"json"}

export function getFirestoreInstance(){
    //check if app has been initialize
    const isInitiallize = getApps().length > 0;
    if (!isInitiallize) {// no inizialize connect to firestore
        initializeApp({
            credential: cert(service_account),
        })
        
    }
    return getFirestore();
}