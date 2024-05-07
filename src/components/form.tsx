"use client";
import React from "react";
import { ErrorResponse, SuccessResponse, handleSubmit } from "@/actions/submit";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";

export default function Form() {
  const [state, action] = useFormState<SuccessResponse | ErrorResponse>(
    // @ts-ignore
    handleSubmit,
    { status: "ok", data: {} }
  );

  console.log(state);

  return (
    <>
      <form action={action}>
        <div className="join join-vertical my-8 w-full md:join-horizontal md:w-fit">
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            className="input join-item input-bordered text-gray-200"
            required
          />
          <SubmitButton className="join-item bg-primary" text="Search" />
        </div>
      </form>
      {state.status === "failed" && (
        <div className="text-red-300">
          {state.message}, Please try again later.
        </div>
      )}
      {state.status === "ok" && (
        <div className="flex gap-4 justify-center">
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h1 className="card-title text-5xl">
                {state.data?.age?.age ?? 0}
              </h1>
              <p>Age</p>
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h1 className="card-title text-5xl capitalize">
                {state.data?.gender?.gender ?? "?"}&nbsp;
              </h1>
              <p>Gender</p>
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h1 className="card-title text-5xl">
                {state.data?.country?.country[0].country_id ?? "?"}&nbsp;
              </h1>
              <p>Nationality</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
