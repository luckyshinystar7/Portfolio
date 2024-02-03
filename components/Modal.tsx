"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: React.PropsWithChildren) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted ? createPortal(<div className="fixed top-0 bottom-0 left-0 right-0 z-50">{children}</div>, document.body) : null;
}
