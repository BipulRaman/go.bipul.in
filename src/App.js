import React, { useState } from "react";

import "./App.scss";
import { GetLinkInfo } from "./service";

const App = () => {
  const linkId = window.location.hash.substring(1);
  const [displayText, setDisplayText] = useState("Redirecting..");
  GetLinkInfo(linkId)
    .then((response) => {
      console.log(response.value[0]);
      window.location = response.value[0].TargetUrl;
    })
    .catch(error => {
      setDisplayText("Link not found !!")
    });

  return <h1>{displayText}</h1>;
};

export default App;