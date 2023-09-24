import { useEffect, useState } from "react";
import {responseError} from "../errors/errors"
import axios from "axios";

export const useFetch = (data) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError,setApiError] = useState(null);

  const getResponse = ({ url, path, id='',modifiers = '' }) => {
    const urlFormat = `${url}${path}${id}${modifiers}`;
    axios.get(urlFormat)
      .then((resp) => {
        setApiResponse(resp);
      })
      .catch((error) => {
        setApiError(error);
      });
  };

  useEffect(() => {
    getResponse(data);
  }, [data.url,data.path,data.id]);

  return [apiResponse, apiError, getResponse];
};
