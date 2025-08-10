import Link from "next/link";
import MemberGrid from "./user-grid";
import { GET } from "@/utilities/fetch-helper";
import { User, UserSearch } from "@/models/system/user";

export async function getUser(search?: UserSearch): Promise<User[]> {
  const params = new URLSearchParams();

  if (search) {
    if (search.id) search.id.forEach(x => params.append("id", x));
    if (search.username) search.username.forEach(x => params.append("username", x));
    if (search.firstName) search.firstName.forEach(x => params.append("firstName", x));
    if (search.lastName) search.lastName.forEach(x => params.append("lastName", x));
    if (search.email) search.email.forEach(x => params.append("email", x));
  }

  const response = await GET<User[]>({
    isAuth: true,
    path: "/api/system/user",
    cache: "no-cache",
    query: params.toString(),
  });

  if (response.status === 200) {
    
    return response.data!;
  }

  return [];
}

export default async function UserPage({ searchParams }: { searchParams: Promise<{ [key: string]: string[] | undefined }>}) {
  const search: UserSearch = {
    id: (await searchParams).id,
    username: (await searchParams).username,
    firstName: (await searchParams).firstName,
    lastName: (await searchParams).lastName,
    email: (await searchParams).email,
  }

  const data = await getUser(search);

  return (
    <>
      <div className="breadcrumbs">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>User</li>
        </ul>
      </div>

      <div className="bg-base-100 p-4">
        <MemberGrid data={data}/>
      </div>
    </>
  );
}
