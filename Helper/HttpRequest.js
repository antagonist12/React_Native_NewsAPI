import React, { useEffect, useState } from "react";
import axios from "axios";

export function useAxiosGet(url) {
  const [request, setRequest] = useState({
    data: null,
    loading: false,
  });

  useEffect(() => {
    // setRequest({
    //   loading: true,
    // });
    axios
      .get(url)
      .then((Response) => {
        setRequest({
          data: Response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);

  return request;
}
