import {
  FETCH_VERIFIED_AUDITS_SUCCESS_ACTION,
  FETCH_VERIFIED_AUDITS_FAILURE_ACTION,
  DOWNLOAD_HDFC_AUDIT_REPORT_SUCCESS_ACTION,
  DOWNLOAD_HDFC_AUDIT_REPORT_FAILURE_ACTION
} from "../actions/types";
import { toast } from "react-semantic-toasts";

const INIT_STATE = {};

export default function(state = INIT_STATE, action) {
  state = Object.assign({}, state, {});

  switch (action.type) {
    case FETCH_VERIFIED_AUDITS_SUCCESS_ACTION:
      state.verifiedAudits = action.payload.audits;
      state.fetchVerifiedAuditsError = false;
      return state;

    case FETCH_VERIFIED_AUDITS_FAILURE_ACTION:
      state.fetchVerifiedAuditsError = true;
      return state;

    case DOWNLOAD_HDFC_AUDIT_REPORT_SUCCESS_ACTION:
      console.log("Downloaded");
      setTimeout(() => {
        toast({
          type: "success",
          icon: "thumbs up outline",
          title: "Success",
          description: "Report Downloaded",
          time: 5000
        });
      }, 0);
      var buff = new Buffer(action.payload, "base64");
      var text = buff.toString("utf-8");

      fileDownload(text, "hdfcAuditReport.xlsx");

         downloadSuccess = true;

      return state;
    

    case DOWNLOAD_HDFC_AUDIT_REPORT_FAILURE_ACTION:
      downloadSuccess = false;
      setTimeout(() => {
        toast({
          type: "error",
          icon: "thumbs down outline",
          title: "error",
          description: "Failed to download",
          time: 5000
        });
      }, 0);
      return state
  }
  return state;
}
