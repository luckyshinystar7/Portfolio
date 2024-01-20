"use client";
import React, { useState } from "react";
import useInterval from "@/utils/hooks/useInterval";

const IntervalLabel = ({ labels }: { labels: string[] }) => {
  let [labelState, setLabel] = useState<string>(labels[0]);
  let [counter, setCounter] = useState<number>(0);

  useInterval(() => {
    setLabel(labels[counter]);
    if (counter >= labels.length) {
      setLabel(labels[0]);
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }, 1000);

  return <>{labelState}</>;
};

export default IntervalLabel;
