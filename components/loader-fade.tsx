"use client";

import { FadeLoader } from "react-spinners";

export function LoaderFade() {
  return (
    <div className="fixed inset-0 z-50 bg-black/5">
      <FadeLoader />
    </div>
  );
}
