'use client'
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function Sidebar({children}: {children: React.ReactNode}) {
    return(
      <main>
<div className="drawer ">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="navbar bg-base-100">
    <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
    <AlignRight />
    </label>
  </div>
  <div className="flex-1">
    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
  </div>
  <div className="flex-none gap-2">
    {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    {/* Page content here */}
    {children}
  </div>
  <div className="drawer lg:drawer-open"> 
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    
  
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li className="place-content-end lg:hidden"><label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay btn btn-error"> <X /></label></li>
      <Image src="/img/logo.png" className="mx-auto" alt="Description" width={150} height={100} />
      <li className="menu-title">MAIN MENU</li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li><Link href="/usermanagement">Users</Link></li>
      <li><Link href="#">Product</Link></li>
      <li>Categories</li>
      <li>Brands</li>
      <li>Scan Barcode</li>

      <li className="menu-title">ANALYTICS</li>
      <li>Stocks</li>
      <li>Orders</li>
      <li>Refund</li>
      <li>Stock</li>
      <li>Reports</li>

      <li className="menu-title">SETTINGS</li>
      <li>Settings</li> 
      <li>Logout</li>

    </ul>
  </div>
</div>
</div>
</main>
    );
}
