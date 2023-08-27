import { computed , ref} from "vue";
import { useStore } from "vuex";
import { dummyAPIWithFailureRate, API_ACTION_TYPE, createNewMessage } from "src/util/mockupAjaxApi.js"

export function useMessage(){
    const message = ref('');
    const messageInputDisabled = ref(false)
    function onMessageErrorCatch(messageText){
        messageInputDisabled.value = false 
        message.value = messageText
    }
    function onMessageSubmit(){
        messageInputDisabled.value = false 
    }
    function setMessageInputDisabled(val){
        messageInputDisabled.value = val 

    }
    

    return (
      {  message ,
        messageInputDisabled,
        onMessageErrorCatch,
        onMessageSubmit,
        setMessageInputDisabled}
    )
    
}

export function useSubmitMessage() {
    const $store = useStore();

    const { currentUserComputed, chatsComputed } = useGetCommonComputedValue();
    return function messageSubmit({ message , }) {
        
        
        return (new Promise(function (res, rej) {

            
            // window.$store = $store
            const newMessage = createNewMessage({
                currentUser: currentUserComputed.value,
                chats: chatsComputed.value,
                message
            })
            const newData = [ ...chatsComputed.value , newMessage]
            const errorIndex = newData.length -1 
            try{
                    
                $store.commit("updateConverstation",newData )
            }catch(Err){
                
            }
            
          
            const API_PROMISE = $store.dispatch("sendUser", { message , errorIndex , newMessage})
            
            API_PROMISE.then(res).catch((err) =>{
                
                rej(message)
                
            })

        }))





    }



}
export default function useGetCommonComputedValue() {
    const $store = useStore();

    const currentUserComputed = computed(function () {
        return $store.state.currentUser
    })
    const chatsComputed = computed(function () {
        return $store.state.chats
    })

    return ({
        currentUserComputed,
        chatsComputed
    })
}