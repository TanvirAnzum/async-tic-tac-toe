import React from "react";
import { MagnifyingGlass, Puff } from "react-loader-spinner";

const Loader = ({ auth }) => {
  const content = auth ? (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  ) : (
    <Puff
      height="80"
      width="80"
      radius={1}
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
  return (
    <>
      <div className="w-fit h-fit fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
        {content}
      </div>
    </>
  );
};

export default Loader;
