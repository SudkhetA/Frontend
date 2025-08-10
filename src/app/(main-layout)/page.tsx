export const metadata = {
  title: "Home | Tepmplate",
  description: "Home page",
};

export default function IndexPage() {
  return (
    <>
      <div className="breadcrumbs">
        <ul>
          <li>Home</li>
        </ul>
      </div>
      <div className="bg-base-100 p-4">
        Main Content
      </div>
    </>
  );
}
