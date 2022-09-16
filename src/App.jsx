import React, { useState } from "react";
import styles from "./App.module.scss";
import { GetLinkInfo } from "./service";

const App = () => {
  const linkId = window.location.hash.substring(1);
  const [displayText, setDisplayText] = useState("Redirecting.. 🚀");
  GetLinkInfo(linkId)
    .then((response) => {
      window.location = response.value[0].TargetUrl;
    })
    .catch(error => {
      setDisplayText("Destination does not exist! 😶")
    });

  return(
    <div>
      <h1>{displayText}</h1>
    </div>
  );
};

export default App;