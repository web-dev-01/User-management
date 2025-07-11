'use client';

import { BoltIcon, ShieldCheckIcon, CloudIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Global Deployment',
    description: 'Seamless deployment across multiple cloud platforms—AWS, Azure, and GCP—for worldwide geolocation solutions.',
    icon: CloudIcon,
  },
  {
    title: 'Robust Security',
    description: 'Advanced encryption, access control, and compliance for secure semiconductor data management.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'High-Performance Processing',
    description: 'Optimized indexing and sharding for superior semiconductor and geolocation performance.',
    icon: BoltIcon,
  },
  {
    title: 'Innovative Design',
    description: 'Flexible architecture with precision geolocation and semiconductor integration.',
    icon: CubeTransparentIcon,
  },
];

export default function Features() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-[#f1f5f9]">Why Choose Champion Semiconductor LLP GeoCon Company?</h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 dark:text-gray-400">Elevate your technology with industry-leading semiconductor and geolocation solutions.</p>
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1A3C34]">
              <feature.icon className="h-8 sm:h-10 w-8 sm:w-10 text-[#00ED64] mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A3C34] dark:text-[#00ED64]">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}