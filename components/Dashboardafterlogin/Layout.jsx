'use client';

import Footer from './Footer';
import TopNavbar from './TopNavbar'; // optional
import Sidebar from './Sidebar';     // optional

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Optional top nav and sidebar */}
      <TopNavbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow pb-20 p-4">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
