"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const Provider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
