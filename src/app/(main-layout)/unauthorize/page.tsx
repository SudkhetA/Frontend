import Link from "next/link";

export const metadata = {
  title: "Unauthorize",
  description: "Unauthorize page",
}

export default function UnauthorizePage() {
  return (
    <div className="bg-base-100 p-4">
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <span>Unauthorize</span>
          </li>
        </ul>
      </div>
    </div>
  );
}