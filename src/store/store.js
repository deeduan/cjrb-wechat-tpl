import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openId:'1sf23',
        bottomActive:0,
        activeTime:0,
        currentUid:0
    },
    mutations: {
        setBottomActive (state, active) {
            // let allowActive = new Set([0,1,2]);
            // if (false === allowActive.has(active)) {
            //     active = 0;
            // }
            state.bottomActive = active;
        },
        setActiveTime (state, time) {
            state.activeTime = time;
        },
        setCurrentUid (state, id) {
            state.currentUid = id;
        },
    },
    actions: {}
});
