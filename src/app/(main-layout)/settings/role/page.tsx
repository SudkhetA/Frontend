import Link from "next/link";
import { GET } from "@/utilities/fetch-helper";

export default function RolePage() {
  return (
    <>
      <div className="breadcrumbs">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>Role</li>
        </ul>
      </div>

      <div className="bg-base-100 p-4">
        
      </div>
    </>
  );
}
