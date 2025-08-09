import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";

export const metadata = {
  title: "Home | Tepmplate",
  description: "Home page",
};

export default function IndexPage() {
  return (
    <>
      <Breadcrumbs>
        <Typography>Home</Typography>
      </Breadcrumbs>
      <Card>
        <CardContent>Main Content</CardContent>
      </Card>
    </>
  );
}
