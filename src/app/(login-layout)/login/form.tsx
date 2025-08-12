"use client";

import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { KeyRound, User } from "lucide-react";

function SubmitButton() {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <button type="submit" className="btn btn-primary btn-block" disabled>
        <span className="loading loading-spinner loading-md"></span>
      </button>
    );
  } else {
    return (
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    );
  }
}

function resultMessage(result: string | null) {
  switch(result)
  {
    case "unauthorize":
      return "Username or Password is incorrect";
    case "error":
      return "There is a problem connecting to the server. Please contact the administrator.";
    case null:
    default:
      return "";
  }
}

export default function FormComponent({ 
  action 
}: {
  action: (redirectPath: string, formData: FormData) => Promise<void>
}) {
  const searchParams = useSearchParams();
  const actionWithRedirect = action.bind(null, searchParams.get("path") ?? "/");

  return (
    <>
      <form action={actionWithRedirect} className="bg-base-100 p-4 rounded-lg shadow-md">
        <h4 className="text-center mb-4">Sign In</h4>
        <label className="input mb-3">
          <User />
          <input type="text" name="username" placeholder="Username" className="grow" />
        </label>
        <label className="input mb-3">
          <KeyRound />
          <input type="password" name="password" placeholder="Password" className="grow" />
        </label>
        <span className="text-red-600">{resultMessage(searchParams.get("result"))}</span>

        <div className="flex justify-end mt-4">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}