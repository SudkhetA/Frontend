"use client";

import { House, Settings } from "lucide-react";
import Link from "next/link";

function SideBar() {

  return (
    <aside className="h-full p-3 shadow-lg w-64">
      <div className="text-center mb-4">Logo</div>

      <ul className="menu bg-base-100 w-full">
        <li>
          <Link href="/">
            <House />
            <div
              className="h-6 m-0 py-1">
              Home
            </div>
          </Link>
        </li>
        <li>
          <details>
            <summary>
              <Settings />
              <div
                className="h-6 m-0 py-1">
                Settings
              </div>
            </summary>
            <ul>
              <li>
                <Link href="/settings/user">User</Link>
              </li>
              <li>
                <Link href="/settings/role">Role</Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
}

function Header() {
  return (
    <header className="w-full h-16 flex justify-between px-4">
      <div className="flex items-center">

      </div>
      <div className="flex items-center"></div>
    </header>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 bg-base-300 p-4">{children}</main>;
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <Main>{children}</Main>
      </div>
    </div>
  );
}
