import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const footerSections = [
  {
    title: "Discover Snackaroo",
    links: [
      "Investors",
      "About us",
      "Takeaway",
      "More",
      "Newsroom",
      "Engineering blog",
      "Design blog",
      "Gift Cards",
      "Deliveroo Students",
      "Careers",
      "Restaurant signup",
      "Become a rider",
    ],
  },
  {
    title: "Legal",
    links: [
      "Terms and conditions",
      "Privacy",
      "Cookies",
      "Modern Slavery Statement",
      "Tax Strategy",
      "Section 172 Statement",
      "Public Authority Requests",
    ],
  },
  {
    title: "Help",
    links: ["Contact", "FAQs", "Cuisines", "Brands"],
  },
];

export function PageFooter() {
  return (
    <footer className="bg-[#2e3333] text-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.title} className="bg-[#434848] p-6">
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-[#434848] p-6">
          <h2 className="text-lg font-semibold mb-4">
            Take Deliveroo with you
          </h2>
          <div className="space-y-2">
            <a href="#" className="inline-block">
              <img
                src="/placeholder.svg?height=40&width=135"
                alt="Download on the App Store"
                width={135}
                height={40}
                className="rounded-md"
              />
            </a>
            <a href="#" className="inline-block">
              <img
                src="/placeholder.svg?height=40&width=135"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="text-gray-400 hover:text-white">
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Snackaroo
        </p>
      </div>
    </footer>
  );
}
