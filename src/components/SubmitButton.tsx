"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type propType = {
  text: string;
  className?: React.CSSProperties | string;
  loadingText?: string;
};

export function SubmitButton({
  text,
  loadingText = "Loading...",
  className,
}: propType) {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        "btn btn-primary disabled:bg-gray-400 disabled:opacity-50 " + className
      }
      aria-disabled={pending}
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <span className="loading loading-dots bg-white loading-md"></span>
      ) : (
        text
      )}
    </button>
  );
}
