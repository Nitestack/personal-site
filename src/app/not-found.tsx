"use client";

import Error from "next/error";
import { type FC } from "react";

const NotFound: FC = () => {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
};

export default NotFound;
