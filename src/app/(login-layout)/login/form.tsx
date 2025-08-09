"use client";

import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

function SubmitButton() {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <Button variant="contained" fullWidth={true} disabled={true}>
        <CircularProgress size={20} />&nbsp;
      </Button>
    );
  } else {
    return (
      <Button variant="contained" type="submit" fullWidth={true} disabled={status.pending}>
        Login
      </Button>
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
      <form action={actionWithRedirect}>
        <Card>
          <CardContent>
            <Box className="mb-3">
              <Typography variant="h4" className="text-center" >เข้าสู่ระบบ</Typography>
            </Box>
            <Box className="mb-3">
              <TextField
                required={true}
                fullWidth={true}
                name="username"
                label="Username"
                type="text"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box className="">
              <TextField
                required={true}
                fullWidth={true}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                size="small"
              />
            </Box>
            <span className="text-red-600">{resultMessage(searchParams.get("result"))}</span>
          </CardContent>
          <CardActions className="justify-end">
            <SubmitButton />
          </CardActions>
        </Card>
      </form>
    </>
  );
}