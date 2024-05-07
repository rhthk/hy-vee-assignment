"use server";
import axios, { AxiosError } from "axios";

export type SuccessResponse = {
  status: "ok";
  data: { age: any; gender: any; country: any };
};

export type ErrorResponse = {
  status: "failed";
  message: string;
  errors: any;
};

export async function handleSubmit(
  _: any,
  query: FormData
): Promise<SuccessResponse | ErrorResponse> {
  const Name = query.get("name");
  try {
    const Age_response = await axios.get("https://api.agify.io/?name=" + Name);
    const Country_response = await axios.get(
      "https://api.nationalize.io/?name=" + Name
    );
    const Gender_response = await axios.get(
      "https://api.genderize.io/?name=" + Name
    );
    return {
      status: "ok",
      data: {
        age: Age_response.data,
        gender: Gender_response.data,
        country: Country_response.data,
      },
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError)
      return {
        status: "failed",
        errors: { api: error.code },
        message: error.message,
      };
    return {
      status: "failed",
      errors: { api: "Error from api" },
      message: "unknown error",
    };
  }
}
