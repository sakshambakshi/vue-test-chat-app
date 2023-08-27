<template>
  <main>
    <div class="message-app-container">
      <Converstation />
      <ComposeSection
        v-model:message="message"
        @submit="sendReply"
        v-bind="{ messageInputDisabled, setMessageInputDisabled }"
      />
    </div>
  </main>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import Converstation from "components/Converstation.vue";
import ComposeSection from "components/ComposeSection.vue";
import { useMessage, useSubmitMessage } from "src/composables/common.js";

const $store = useStore();
onMounted(function () {
  $store.dispatch("fetchChat");
});

const {
  message,
  messageInputDisabled,
  onMessageErrorCatch,
  onMessageSubmit,
  setMessageInputDisabled,
} = useMessage();
const submitChat = useSubmitMessage();
function sendReply() {
  //  const reply
  
  const $message = message.value
  if(!$message){
    return 
  }
  messageInputDisabled.value = true 
  message.value = ''
  submitChat({ message: $message })
    .then(function () {
      
      onMessageSubmit();
    })
    .catch(function (msg) {
      
      onMessageErrorCatch(msg);
    });
}
</script>

<style>
</style>