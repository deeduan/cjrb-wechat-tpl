import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openId:'1sf23',
        bottomActive:0,
        activeTime:0,
        currentUid:0,
        c_id:1,
        windowMaps:[
            '(63-75号)',
            '(51-62号)',
            '(76-80号)',
            '(22-34号)',
            '(13-19号)',
            '(1-11号)',
            '(36号)',
            '(48-50号)',
            '(94号)',
            '(101号)',
            '(85号)',
            '(141号)',
            '(27号)',
            '(135号)',
            '(96号)',
            '(137号)',
            '(99号)',
            '(131号)',// 18
            '(127号)',
            '(119-121号)',
            '(116号)',
            '(103号)',
            '(93号)',
            '(86号)',
            '(136号)',
            '',
            '(44-45号)',// 27
            '(105号)',
            '(91-92 46-47号)',
            '(122-126号)',
            '(87-89号)',
            '(134号)',
            '(98号)',
            '(95号)',
            '',
            '(81-82号)',
            '(97号)',
            '',
            '(104号)',
            '(84号)',
            '(142号)',
            '(129-130号)',
            '(100号)',
            '(102号)',
            '(83号)',
        ]
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
        setCid (state, id) {
            state.c_id = id;
        },
    },
    actions: {}
});
