import {FETCH_HDFC_TEMPLATE_SUCCESS_ACTION,FETCH_HDFC_TEMPLATE_FAILURE_ACTION} from "../actions/types";

const INIT_STATE = {};

export default function(state = INIT_STATE, action) {
  state = Object.assign({}, state, {});

  switch (action.type) {
    case FETCH_HDFC_TEMPLATE_SUCCESS_ACTION:
      state.templates = action.payload.templates;
      state.fetchTemplateError = false;
      return state;

    case FETCH_HDFC_TEMPLATE_FAILURE_ACTION:
      state.fetchTemplateError = true;
      return state;
  }
  return state;
}