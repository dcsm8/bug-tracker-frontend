import type { PropsWithChildren } from "react";
import React, { Fragment } from "react";

export interface ShowIfProps {
  condition: boolean;
}

export const ShowIf: React.FC<PropsWithChildren<ShowIfProps>> = ({
  children,
  condition,
}) => {
  return condition ? <Fragment>{children}</Fragment> : null;
};
