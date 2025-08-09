import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Unauthorize",
  description: "Unauthorize page",
}

export default function UnauthorizePage() {
  return (
    <Breadcrumbs>
      <Link href="/" className="hover:underline">Home</Link>
      <Typography>Unauthorize</Typography>
    </Breadcrumbs>
  );
}