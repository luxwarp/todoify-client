const state = {
  showMainNav: window.innerWidth > 1024 || false,
  requestStatus: 0,
  notifiers: []
};

const getters = {
  showMainNav(state) {
    return state.showMainNav;
  },
  getRequestStatus(state) {
    return state.requestStatus > 0;
  },
  getNotifiers(state) {
    return state.notifiers;
  }
};

const mutations = {
  toggleMainNav(state) {
    if (window.innerWidth < 1025) {
      state.showMainNav = !state.showMainNav;
    }
  },
  showMainNav(state) {
    state.showMainNav = true;
  },
  hideMainNav(state) {
    state.showMainNav = false;
  },
  showRequestStatus(state) {
    state.requestStatus += 1;
  },
  hideRequestStatus(state) {
    state.requestStatus -= 1;
  },
  createNotifier(state, note) {
    if (!state.notifiers.some(notifier => notifier.message === note.message)) {
      state.notifiers.push(note);
    }
  },
  closeNotifier(state, index = 0) {
    state.notifiers.splice(index, 1);
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
