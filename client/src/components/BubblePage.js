import React, { useState, useEffect } from "react";
import axiosWithAuth from "./utils/axiosWithAuth"
import { Spinner } from "reactstrap"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        setColorList(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner color="dark" />
        </div>
      ) : (
          <>
            <ColorList colors={colorList} updateColors={setColorList} />
            <Bubbles colors={colorList} />
          </>
        )}

    </>
  );
};

export default BubblePage;
