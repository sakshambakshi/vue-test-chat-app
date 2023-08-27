
import { createStore } from 'vuex'
import { dummyAPIWithFailureRate, API_ACTION_TYPE, createNewMessage } from "src/util/mockupAjaxApi.js"
import { currentUser } from "src/util/mockup"
const $store = createStore({
  state: {
    currentUser: JSON.parse(currentUser),
    chats: [],

  },
  getters: {
   getCurrentUser(state){
    return state.currentUser
   },
   getChats(state){
    return state.chats
   },



  },
  mutations: {
    updateUser(state, newUsers) {
      state.users = newUsers;
    },
    updateConverstation(state, newConverstation) {
      state.chats = newConverstation
    }

  },
  actions: {
    async fetchChat({ commit }) {

      const conversation = await dummyAPIWithFailureRate(API_ACTION_TYPE.GET_DATA)

      commit('updateConverstation', conversation)

    },



    async sendUser({ commit, state , getters}, { message , errorIndex , newMessage}) {

      try{
         const resp = dummyAPIWithFailureRate(API_ACTION_TYPE.SEND_DATA, { chats: getters.getChats, message, currentUser: getters.getCurrentUser })
         return resp
      }catch(Err){
        
        const chats = getters.getChats;
        alert("Error ")
        const filteredChats = chats.filter((_, $id) => $id != errorIndex)
        
        $store.commit("updateConverstation", filteredChats)
        throw (newMessage.message)
      }
     


    }

  },
  modules: {
  }
})
window.$store = $store
export default $store