<template>
  <div class="new-chat-form-container">
    <form @submit.prevent="onNewFormSubmit" class="new-chat-form debug-css">
      <div class="chat-input-container">
        <textarea
          name=""
          class="next-chat-input"
          id=""
          cols="30"
          :rows="textAreaRow"
          :value="$props.message"
          @keydown.enter.exact.prevent="onNewFormSubmit"
          @input="
            (evt) => {
              emitNewMessage(evt);
              textareaResize(evt);
            }
          "
          ref="textAreaRef"
          :disabled="$props.messageInputDisabled"
        ></textarea>
      </div>
      <div>
        <button type="submit" class="enter-new-chat-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path
              d="M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L110,149.81a8,8,0,0,0-3.8-3.8L20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z"
              opacity="0.2"
            ></path>
            <path
              d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    messageInputDisabled:{
      type: Boolean,
      default: false
    },
    setMessageInputDisabled:{
      type:Function
    }
  },
  emits: ["update"],
  setup($props, { emit }) {
    const textAreaRow = ref(1);
    const textAreaRef = ref(null);
    function textareaResize() {
      const elem = textAreaRef.value;
    
      const rows = elem.rows;
      const scrollHeight = elem.scrollHeight;
      const offsetHeight = elem.offsetHeight;
      if(rows > 1 && $props.message == ''){
          return textAreaRow.value = 1
      }
      if (scrollHeight > offsetHeight) {
        if (rows <= 2) {
          textAreaRow.value++;
        }
      }
    }
    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }
    function emitNewMessage(evt) {
      return emit("update:message", evt.target.value);
    }
    function onNewFormSubmit() {
      emit("submit");
    }

    return {
      emitNewMessage,
      onNewFormSubmit,
      textAreaRow,
      textAreaRef,
      textareaResize: debounce(textareaResize, 100),
    };
  },
};
</script>

<style>
</style>