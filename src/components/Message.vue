<template>
  <div      v-bind="{class:['chat' , styleClassesObj.messageClass ]}">
    <div  class="user-pic-container tooltip">
      <img
        class="user-pic-image"
        src="/user.svg"
        alt="user-image"
      />
      <div v-bind="{class:['tooltiptext' , styleClassesObj.toolTipClass]}">
         {{$props.messageSender.firstName }}
      </div>
    </div>
    
    <div v-if="$props.messageText.trim().length" class="chat-text-container">{{ $props.messageText }}</div>
  </div>
</template>

<script >
import { defineComponent , computed } from "vue";
import { useStore } from "vuex";
import useGetCommonComputedValue from "src/composables/common.js"
    export default defineComponent({
        name:"Message",
        props:{
            messageText:{
                type:String,
                default: ''
            },
            messageSender:{
                type:Object,
                default: () =>({})
            },
            messageDate:{
              type:String,
              default:''
            }
        },
        setup($props){
          const $store = useStore()
          // const currentUser = computed(function(){
          //   return $store.state.currentUser
          // })
          const {currentUserComputed} = useGetCommonComputedValue()

          const styleClassesObj = computed(function(){
            const isSender = currentUserComputed.value.id === $props.messageSender.id; 
            if(isSender){
              return {messageClass : 'chat-sent-container' ,toolTipClass:'tooltip-left'}
            }
            return {messageClass : 'chat-recieve-container',toolTipClass:'tooltip-right'}

          })

          return {
            currentUserComputed,
            styleClassesObj
          }
        }
    })

</script>

<style>
</style>