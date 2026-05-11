"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "#",
    submenu: [
      { name: "Company Profile", href: "/about" },
      { name: "The Founder", href: "/drbio" },
      { name: "Awards", href: "/awards" },
      { name: "Records", href: "/records" },
    ],
  },
  { name: "Treatments", href: "/treatments" },
  { name: "Book an Appointment", href: "/appointment", highlight: true },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  return (
    <>
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .blinking {
          font-size: 24px;
          font-weight: bold;
          color: #fdfefe;
          animation: blink 1s infinite;
        }
      `}</style>

      <div className="ayur-menu-wrapper">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo Section */}
            <div className="col-lg-2 col-md-4 col-sm-5 col-6">
              <div className="ayur-menu-logo">
                <Link href="/">
                  <Image
                    src="/logo/logo.jpg"
                    alt="E-Bio Cares Logo"
                    width={120}
                    height={60}
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="col-lg-10 col-md-8 col-sm-7 col-6">
              <div className="ayur-navmenu-wrapper">
                {/* Desktop Navigation */}
                <div className="ayur-nav-menu">
                  <ul>
                    {navItems.map((item) => (
                      <li
                        key={item.name}
                        className={item.submenu ? "ayur-has-menu" : item.highlight ? "blinking-item" : ""}
                      >
                        {item.submenu ? (
                          <>
                            <a href="javascript:void(0)">
                              {item.name}
                              <svg
                                version="1.1"
                                x="0"
                                y="0"
                                viewBox="0 0 491.996 491.996"
                                style={{
                                //  enableBackground: "new 0 0 512 512",
                                  width: "12px",
                                  height: "12px",
                                  marginLeft: "5px",
                                  display: "inline-block",
                                }}
                              >
                                <g>
                                  <path
                                    d="m484.132 124.986-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z"
                                    opacity="1"
                                    fill="currentColor"
                                  />
                                </g>
                              </svg>
                            </a>
                            <ul className="ayur-submenu">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link href={subItem.href}>{subItem.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : item.highlight ? (
                          <a href={item.href} className="blinking" style={{ color: "red" }}>
                            <b>{item.name}</b>
                          </a>
                        ) : (
                          <Link href={item.href}>{item.name}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Toggle Button */}
                <div className="ayur-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="ayur-mobile-nav" style={{ marginTop: "10px", paddingBottom: "15px" }}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                          }
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background: "none",
                            border: "none",
                            color: "white",
                            padding: "12px 0",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          {item.name}
                          <span
                            style={{
                              float: "right",
                              transition: "transform 0.3s",
                              transform:
                                openSubmenu === item.name ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            ▼
                          </span>
                        </button>
                        {openSubmenu === item.name && (
                          <ul style={{ paddingLeft: "20px", background: "rgba(255,255,255,0.1)" }}>
                            {item.submenu.map((subItem) => (
                              <li key={subItem.name} style={{ padding: "8px 0" }}>
                                <Link
                                  href={subItem.href}
                                  style={{ color: "rgba(255,255,255,0.8)" }}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        style={{
                          display: "block",
                          padding: "12px 0",
                          color: item.highlight ? "#ff0000" : "white",
                          fontWeight: item.highlight ? "bold" : "400",
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronDown, Menu, X } from "lucide-react"

// const navItems = [
//   { name: "Home", href: "/" },
//   {
//     name: "About Us",
//     href: "#",
//     submenu: [
//       { name: "Company Profile", href: "/about" },
//       { name: "The Founder", href: "/drbio" },
//       { name: "Awards", href: "/awards" },
//       { name: "Records", href: "/records" },
//     ],
//   },
//   { name: "Treatments", href: "/treatments" },
//   { name: "Book an Appointment", href: "/appointment", highlight: true },
//   { name: "Contact", href: "/contact" },
// ]

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

//   return (
//     <header className="bg-[#2d5a27] sticky top-0 z-50 shadow-lg">
//       <div className="container-custom">
//         <div className="flex items-center justify-between py-3">
//           {/* Logo */}
//           <Link href="/" className="flex-shrink-0">
//             <Image
//               src="/logo/logo.jpg"
//               alt="E-Bio Cares Logo"
//               width={120}
//               height={60}
//               className="h-14 w-auto rounded"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {navItems.map((item) => (
//               <div key={item.name} className="relative group">
//                 {item.submenu ? (
//                   <>
//                     <button
//                       className="flex items-center gap-1 px-4 py-2 text-white hover:text-[#E4D4CF] transition-colors font-medium"
//                       onMouseEnter={() => setOpenSubmenu(item.name)}
//                       onMouseLeave={() => setOpenSubmenu(null)}
//                     >
//                       {item.name}
//                       <ChevronDown className="w-4 h-4" />
//                     </button>
//                     <div
//                       className={`absolute top-full left-0 bg-white rounded-md shadow-lg py-2 min-w-[200px] transition-all duration-200 ${
//                         openSubmenu === item.name ? "opacity-100 visible" : "opacity-0 invisible"
//                       }`}
//                       onMouseEnter={() => setOpenSubmenu(item.name)}
//                       onMouseLeave={() => setOpenSubmenu(null)}
//                     >
//                       {item.submenu.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           href={subItem.href}
//                           className="block px-4 py-2 text-gray-700 hover:bg-[#f6f1ed] hover:text-[#CD8973] transition-colors"
//                         >
//                           {subItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </>
//                 ) : item.highlight ? (
//                   <Link
//                     href={item.href}
//                     className="px-4 py-2 text-red-500 font-bold blinking hover:text-red-400 transition-colors"
//                   >
//                     {item.name}
//                   </Link>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className="px-4 py-2 text-white hover:text-[#E4D4CF] transition-colors font-medium"
//                   >
//                     {item.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden p-2 text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden py-4 border-t border-white/20">
//             {navItems.map((item) => (
//               <div key={item.name}>
//                 {item.submenu ? (
//                   <div>
//                     <button
//                       className="flex items-center justify-between w-full px-4 py-3 text-white"
//                       onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
//                     >
//                       {item.name}
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
//                       />
//                     </button>
//                     {openSubmenu === item.name && (
//                       <div className="bg-white/10 py-2">
//                         {item.submenu.map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             href={subItem.href}
//                             className="block px-8 py-2 text-white/80 hover:text-white"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             {subItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`block px-4 py-3 ${item.highlight ? "text-red-400 font-bold" : "text-white"}`}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </nav>
//         )}
//       </div>
//     </header>
//   )
// }
