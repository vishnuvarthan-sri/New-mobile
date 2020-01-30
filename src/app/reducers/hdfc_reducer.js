import {
  FETCH_HDFC_MASTER_SUCCESS_ACTION,
  FETCH_HDFC_MASTER_FAILURE_ACTION,
  SAVE_AUDIT_SUCCESS_ACTION,
  SAVE_AUDIT_FAILURE_ACTION
} from "../actions/types";

const INIT_STATE = {};

export default function(state = INIT_STATE, action) {
  state = Object.assign({}, state, {});

  switch (action.type) {
    case FETCH_HDFC_MASTER_SUCCESS_ACTION:
      state.auditedAudits = action.payload.audits;
      state.fetchMasterError = false;
      return state;

    case FETCH_HDFC_MASTER_FAILURE_ACTION:
      state.fetchMasterError = true;
      return state;

    case SAVE_AUDIT_SUCCESS_ACTION:
      state.saveAuditsError = false;
      return state;
      
    case SAVE_AUDIT_FAILURE_ACTION:
      state.saveAuditsError = true;
  }
  return state;
}
