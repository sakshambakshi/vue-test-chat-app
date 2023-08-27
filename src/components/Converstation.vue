<template>
  <div class="chats-container">
    <Message v-for="chat in chatsDisplayed" :key="chat.id" :messageText="chat.message" :messageDate="chat.date" :messageSender="chat.from" />
  </div>
</template>

<script>
import Message from "components/Message.vue";
import { useStore } from "vuex";
import {computed} from "vue"
import useGetCommonComputedValue from "src/composables/common.js"
export default {
  name: "Converstation",
  components: {
    Message,
  },
  setup() {
    const $store = useStore();
    const {chatsComputed} = useGetCommonComputedValue()

    const chatsDisplayed = computed(function(){

        if(Array.isArray(chatsComputed.value)){
            return [...chatsComputed.value].reverse()
        }
        return []
    })
    return {
        chatsDisplayed
    };
  },
};
</script>

<style>
body {
}
.chats-container {
  min-height: 50vh;
}
</style>