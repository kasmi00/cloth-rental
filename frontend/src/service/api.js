import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from "../constants/config";
import { getAccessToken, getType } from "../utils/common_utils";

const API_URL = import.meta.env.VITE_APP_HOST;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "content-type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    // if (config.TYPE.params) {
    //   config.params = config.TYPE.params;
    // } else if (config.TYPE.query) {
    //   config.url = config.url + "/" + config.TYPE.query;
    // }
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      const queryParams = Array.isArray(config.TYPE.query)
        ? config.TYPE.query.join("/")
        : config.TYPE.query;
      config.url = config.url + "/" + queryParams;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    //  global loader stop here
    return processResponse(response);
  },
  function (error) {
    //  gloabal loader stop here
    return Promise.reject(ProcessError(error));
  }
);

//  if success =>return {isSuccess:true, data :object}
// if fail->return{ isFailure:true, status:string, msg:string, statusCode:int}
const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

// //  if success =>return {isSuccess:true, data :object}
// if fail->return{ isFailure:true, status:string, msg:string, statusCode:int}
const ProcessError = async (error) => {
  if (error.response) {
    // Request made and server responded with a status code
    // that falls out of the range of 2xx

    // if (error.response?.status === 403) {
    // try {
    //   let response = await API.getRefreshToken({ token: getRefreshToken() });
    //   if (response.isSuccess) {
    //     // sessionStorage.clear();
    //     sessionStorage.removeItem("accesstoken");
    //     console.log("reponse token", response);
    //     const newToken = setAccessToken(response.data.accessToken);
    //     console.log("tokens🤑🤑", newToken, "😣", response.data.refreshToken);
    //     setRefreshToken(newToken);
    //     const requestData = error.toJSON();
    //     console.log("Token after expire", getAccessToken());
    //     let response1 = await axios({
    //       method: requestData.config.method,
    //       url: requestData.config.baseURL + requestData.config.url,
    //       headers: {
    //         "content-type": "application/json",
    //         authorization: getAccessToken(),
    //       },
    //       params: requestData.config.params,
    //     });
    //     // Return the response of the retry request
    //     return response1;
    //   }
    // } catch (error) {
    //   return Promise.reject(error);
    // }
    // }
    // else {
    //   console.error("ERROR IN RESPONSE: ", JSON.stringify(error));
    //   return {
    //     isError: true,
    //     msg: API_NOTIFICATION_MESSAGES.responseFailure,
    //     code: error.response.status,
    //   };
    // }

    if (error.response) {
      // request  made  and server responded with a status other that falls out of range 2.x.x
      console.log("Error in response:", error.toJSON());
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error("ERROR IN RESPONSE: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("ERROR IN RESPONSE: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
