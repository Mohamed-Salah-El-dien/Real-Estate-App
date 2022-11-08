import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

const Loading = () => (
  <div>
    <CirclesWithBar type="Puff" color="gray" height={550} width={80} />
  </div>
);

export default Loading;
