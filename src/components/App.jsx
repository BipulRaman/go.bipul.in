import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { GetLinkInfo } from "../utils/service";

const App = () => {
  const linkId = window.location.hash.substring(1);
  const [displayText, setDisplayText] = useState("Redirecting.. 🚀");

  useEffect(() => {
    GetLinkInfo(linkId)
      .then((response) => {
        window.location = response.value[0].TargetUrl;
      })
      .catch((error) => {
        setDisplayText("Destination does not exist! 😶");
      });
  }, [linkId]); // Dependency array ensures this runs only when `linkId` changes

  return (
    <div>
      <h1>{displayText}</h1>
    </div>
  );
};

export default App;