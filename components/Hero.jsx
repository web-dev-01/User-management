'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-12 bg-white dark:bg-[#001E2B]">
      <div className="max-w-lg text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A3C34] dark:text-[#f1f5f9] leading-tight">
          <span className="text-[#00ED64] dark:text-[#00ED64]">Innovate with</span>
          <br />
          Champion Semiconductor LLP
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Empower your technology with cutting-edge semiconductor solutions,
          delivering unmatched performance, scalability, and reliability for
          global industries.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link href="/get-started">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#00ED64] text-[#1A3C34] font-semibold rounded hover:bg-[#00CC55] transition">
              Get Started
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-[#00ED64] text-[#00ED64] font-semibold rounded-md hover:bg-[#00ED64] hover:text-[#1A3C34] transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full sm:w-[400px] md:w-[500px]">
        <Image
          src="/logo.png"
          alt="Semiconductor technology graphic"
          width={400}
          height={400}
          className="mx-auto sm:mx-0"
        />
      </div>
    </section>
  );
}