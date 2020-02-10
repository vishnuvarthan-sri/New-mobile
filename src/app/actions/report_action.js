import axios from "axios";
import qs from "qs";
import * as types from "./types";
import * as FileSaver from 'file-saver';

export const fetchVerifiedAuditsAction = () => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "employee/v1/get/finalAudits")
      .then(function(response) {
        dispatch({
          type: types.FETCH_VERIFIED_AUDITS_SUCCESS_ACTION,
          payload: response.data
        });
        console.log(response.data);
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_VERIFIED_AUDITS_FAILURE_ACTION,
          payload: error
        });
        console.log(error);
      });
  };
};


export const HdfcAuditReportAction = (fromDate,toDate) => {
    return function(dispatch) {
        axios
            .get(types.API_URL + `ebgc/v1/hdfc/report?startdate=${fromDate}&enddate=${toDate}`,{
                responseType: 'blob'
            })
            .then(function(response) {
                FileSaver.saveAs(response.data, 'Hdfc-Audit-Report.pdf');
                dispatch({
                    type: types.DOWNLOAD_HDFC_AUDIT_REPORT_SUCCESS_ACTION,
                    payload: response.data
                });
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
                dispatch({
                    type: types.DOWNLOAD_HDFC_AUDIT_REPORT_FAILURE_ACTION,
                    payload: error
                });
            });
    };
};

export const mailAuditReportAction = (fromDate,toDate, mailIds) => {
  return function (dispatch) {
      axios.get(types.API_URL + `ebgc/v1/report/mail?startdate=${fromDate}&enddate=${toDate}&email=${mailIds}`)
          .then(function (response) {
              dispatch({
                  type: types.MAIL_REPORT_SUCCESS_ACTION,
                  payload: response.data
              });
          })
          .catch(function (error) {
              dispatch({
                  type: types.MAIL_REPORT_SUCCESS_ACTION,
                  payload: error
              });
          });
  };
}