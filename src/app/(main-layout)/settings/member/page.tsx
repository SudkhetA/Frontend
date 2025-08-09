import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function MemberPage() {
  return (
    <>
      <Breadcrumbs>
        <Link href="/" className="hover:underline">Home</Link>
        <Typography>Member</Typography>
      </Breadcrumbs>
      <Card>
        <CardContent>Main Content</CardContent>
      </Card>
    </>
  );
}
