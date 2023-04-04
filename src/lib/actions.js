import {fireBaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'


const db = firebase.firestore(fireBaseApp)

export const getCollection = async (collection) => {
    const result = {statusResponse: false, data: null, error: null }
    try {
        const data = await db.collection(collection).get()
        const dataArray = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
        result.statusResponse = true
        result.data = dataArray
    } catch (error) {
        result.error = error.message
    }
    return result
}

export const addDocument = async (collection, data) => {
    const result = {statusResponse: false, data: null, error: null }
    try {
        const response = await db.collection(collection).add(data)
        result.data = { id: response.id}
        result.statusResponse = true
    } catch (error) {
        result.error = error.message
    }
    return result
}

export const getDocument =  async (collection, id) => {
    const result = {statusResponse: true, data: null, error: null}
    try {
        const response = await db.collection(collection).doc(id)
        result.data = {id: response.id, ...response.data()}
        result.statusResponse = true
    } catch (error) {
        result.error = error.message
    }
    return result
}

export const updateDocument =  async (collection, id, data) => {
    const result = {statusResponse: true, error: null}
    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error.message
    }
    return result
}

export const deleteDocument = async (collection, id )=> {
    const result = {statusResponse: true, error: null}
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true
    } catch (error) {
        result.error = error.message
    }
    return result
}