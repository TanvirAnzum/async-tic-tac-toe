import React, { useContext, useEffect, useState } from "react";
import oIcon from "../assets/images/o.png";
import xIcon from "../assets/images/x.png";
import { AuthContext } from "../contexts/AuthContext";

const BoardBox = ({
  value,
  index,
  initiator,
  selected,
  setSelected,
  nextMove,
}) => {
  const [source, setSource] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (selected === index && !value) {
      setSource(initiator ? xIcon : oIcon);
    }
    if (selected !== index && !value) {
      setSource("");
    }
  }, [index, initiator, selected, value]);

  useEffect(() => {
    setSource(value && (value === 1 ? xIcon : oIcon));
  }, [value]);

  const imageHandler = () => {
    if (!value && nextMove === auth.username) {
      setSelected(index);
    }
  };
  return (
    <div className="box" onClick={imageHandler}>
      <img src={source} alt="" />
    </div>
  );
};

export default BoardBox;
