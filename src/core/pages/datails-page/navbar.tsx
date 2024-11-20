// import Link from "next/link";
// // import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-gray-50 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">G</span>
          </div>
          <span className="text-gray-700 font-semibold">Personal Account</span>
        </div>

        <ul className="flex space-x-8 text-sm text-gray-600 font-medium">
          <li>
            <a className="hover:text-gray-900">Overview</a>
          </li>
          <li>
            <a className="hover:text-gray-900">Users</a>
          </li>
          <li>
            <a className="hover:text-gray-900">Organizations</a>
          </li>
          <li>
            <a className="hover:text-gray-900">Configure</a>
          </li>
        </ul>

        <div className="flex items-center">{/* <UserButton /> */}</div>
      </div>
    </nav>
  );
}
