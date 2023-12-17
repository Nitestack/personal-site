"use client";

import { type FC, useEffect } from "react";

const Error: FC<{ error: Error; reset: () => void }> = ({ error }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oh no, something went wrong... maybe refresh?</p>
    </div>
  );
};

export default Error;
