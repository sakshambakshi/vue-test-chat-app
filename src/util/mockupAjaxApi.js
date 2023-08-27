import moment from "moment";
import { conversation, Users } from "src/util/mockup.js"
export const API_ACTION_TYPE = {
    SEND_DATA: "SEND_DATA",
    GET_DATA: "GET_DATA",
}
const FAILURE_RATE = 10
export function createNewMessage(payload) {
    return (
        {
            id: payload.chats.length,
            from: payload.currentUser,
            message: payload.message,
            date: moment().format('YYYY-MM-DD HH:MM:SS')
        }
    )
}
function parseAndResolve({ res, jsonDataString }) {
    try {
        
        const conversation = JSON.parse(jsonDataString);
        res(conversation)
    } catch (Err) {

    }
}
export function dummyAPIWithFailureRate(ACTION_TYPE, payload) {
    
    if (ACTION_TYPE === API_ACTION_TYPE.GET_DATA) {
        const GET_DATA_API = new Promise(function (res, rej) {
            setTimeout(function () {
                const converstationDataFromLocalstorage = localStorage.getItem('converstation');
                if (converstationDataFromLocalstorage) {
                   return parseAndResolve({ res, jsonDataString: converstationDataFromLocalstorage })
                }
                import("./mockup.js").then((importedData) => {
                    const conversationStr = importedData.conversation;
                    // localStorage.setItem('converstation', conversationStr)
                    return parseAndResolve({ res, jsonDataString: conversationStr })
                })

                // res(conversation)
            }, 0);
        })
        return GET_DATA_API
    }


    if (ACTION_TYPE === API_ACTION_TYPE.SEND_DATA) {
        const API_PROMISE = new Promise(function (res, rej) {
            setTimeout(function () {
                
                const RANDOM = Math.floor(Math.random() * 100)
                const newMessage = createNewMessage(payload)
                
                if (FAILURE_RATE > RANDOM) {
                    return rej({ error: "Unable: To send Message", newMessage })
                }
                    res([...payload.chats, newMessage])
                
                


            }, 2000)



        })
        return API_PROMISE
    }
}