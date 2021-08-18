import { storageRef } from '../Services/firebase'

export const sendPicToStorage = async (payload, id) => {
    try {
        await storageRef.ref(`profilPic/${id}`).put(payload)
        const picUrl = await storageRef.ref(`profilPic/${id}`).getDownloadURL()
        
       return picUrl
        
    } catch (error) {
        console.log(error)
    }
}