"use client";

import { UserSearch } from "@/models/system/user";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function UserFilter({ searchParams }: { searchParams: UserSearch }) {
    const [search, setSearch] = useState<UserSearch>({
      id: searchParams.id ?? "",
      username: searchParams.username ?? "",
      firstName: searchParams.firstName ?? "",
      lastName: searchParams.lastName ?? "",
      email: searchParams.email ?? "",
    });
    const pathname = usePathname();
    const router = useRouter();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearch((prev) => ({
      ...prev,
      [name]: [value],
    }));
  }

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>) {
    const params = new URLSearchParams();
    if (search.id) {
      if (typeof(search.id) === "string") {
        params.append("id", search.id);
      } else {
        search.id.forEach(x => params.append("id", x));
      }
    }
    if (search.username) {
      if (typeof(search.username) === "string") {
        if (search.username.trim() !== "") {
          params.append("username", search.username);
        }
      } else {
        search.username.forEach(x => {
          if (x.trim() !== "") {
            params.append("username", x);
          }
        });
      }
    }
    if (search.firstName) {
      if (typeof(search.firstName) === "string") {
        if (search.firstName.trim() !== "") {
          params.append("firstName", search.firstName);
        }
      } else {
        search.firstName.forEach(x => {
          if (x.trim() !== "") {
            params.append("firstName", x);
          }
        });
      }
    }
    if (search.lastName) {
      if (typeof(search.lastName) === "string") {
        if (search.lastName.trim() !== "") {
          params.append("lastName", search.lastName);
        }
      } else {
        search.lastName.forEach(x => {
          if (x.trim() !== "") {
            params.append("lastName", x);
          }
        });
      }
    }
    if (search.email) {
      if (typeof(search.email) === "string") {
        if (search.email.trim() !== "") {
          params.append("email", search.email);
        }
      } else {
        search.email.forEach(x => {
          if (x.trim() !== "") {
            params.append("email", x);
          }
        });
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  }
  return (
      <div className="px-40">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-md w-full"
                name="username"
                value={search.username}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="col-span-1">
            <label className="floating-label">
              <span>First Name</span>
              <input
                type="text"
                placeholder="First Name"
                className="input input-md w-full"
                name="firstName"
                value={search.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="col-span-1">
            <label className="floating-label">
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-md w-full"
                name="lastName"
                value={search.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="col-span-1">
            <label className="floating-label">
              <span>Email</span>
              <input
                type="text"
                placeholder="Email"
                className="input input-md w-full"
                name="email"
                value={search.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 mb-4">
          <div className="col-span-1">
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSearch}>
              <Search />
              Search
            </button>
          </div>
        </div>
      </div>
  )
}