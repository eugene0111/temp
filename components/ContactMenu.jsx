"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  mail: HiOutlineMail,
};

export default function ContactMenu({ links }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col border-t border-white/10">
      {links.map((link, i) => {
        const IconComponent = iconMap[link.name.toLowerCase()];

        return (
          <Link
            key={link._id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between border-b border-white/10 py-8 transition-all hover:bg-white/5 hover:px-6 md:py-12"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-xs font-mono text-gray-600 transition-colors group-hover:text-neon-green">
                0{i + 1}
              </span>

              {IconComponent && (
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-gray-400 transition-all duration-300 group-hover:border-neon-green group-hover:bg-neon-green group-hover:text-black">
                  <IconComponent />
                </span>
              )}
              
              <h3 className="text-4xl font-bold uppercase tracking-tighter text-gray-300 transition-all duration-300 group-hover:text-white md:text-6xl">
                {link.name}
              </h3>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -45 }}
              animate={{ 
                opacity: hovered === i ? 1 : 0, 
                x: hovered === i ? 0 : -20,
                rotate: hovered === i ? 0 : -45
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hidden md:block text-4xl text-neon-green"
            >
              <FaArrowRight />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
