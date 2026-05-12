import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <div className="ayur-footer-section pt-0">
      <div className="container">
        <div className="ayur-footer-sec">
          <div className="row">
            {/* Logo + Description + Social Links */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="ayur-footer-logosec">
                <div className="ayur-footer-logo">
                  <Image
                    src="/logo/logo-footer.png"
                    alt="E-Bio Cares Logo"
                    width={150}
                    height={75}
                  />
                </div>

                <p>The Best Electropathy, Biopathy & Natural Remedies Holistic Place.</p>

                <ul className="ayur-social-link">
                  <li>
                    <a
                      href="https://www.facebook.com/share/1AEeiLHkEN/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="11"
                        height="20"
                        viewBox="0 0 11 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.74157 20V10.8777H9.80231L10.2615 7.32156H6.74157V5.05147C6.74157 4.0222 7.02622 3.32076 8.50386 3.32076L10.3854 3.31999V0.13923C10.06 0.0969453 8.94308 0 7.64308 0C4.92848 0 3.07002 1.65697 3.07002 4.69927V7.32156H0V10.8777H3.07002V20H6.74157Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/ebiocaresofficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.4996 0H5.49988C2.75019 0 0.5 2.25019 0.5 4.99988V15.0001C0.5 17.7491 2.75019 20 5.49988 20H15.4996C18.2493 20 20.4995 17.7491 20.4995 15.0001V4.99988C20.4995 2.25019 18.2493 0 15.4996 0ZM18.8328 15.0001C18.8328 16.8376 17.3381 18.3333 15.4996 18.3333H5.49988C3.66218 18.3333 2.16671 16.8376 2.16671 15.0001V4.99988C2.16671 3.16193 3.66218 1.66671 5.49988 1.66671H15.4996C17.3381 1.66671 18.8328 3.16193 18.8328 4.99988V15.0001Z"
                          fill="#E4D4CF"
                        />
                        <path
                          d="M15.9172 5.83295C16.6075 5.83295 17.1672 5.27332 17.1672 4.58298C17.1672 3.89264 16.6075 3.33301 15.9172 3.33301C15.2269 3.33301 14.6672 3.89264 14.6672 4.58298C14.6672 5.27332 15.2269 5.83295 15.9172 5.83295Z"
                          fill="#E4D4CF"
                        />
                        <path
                          d="M10.4999 5C7.73793 5 5.5 7.23818 5.5 9.99988C5.5 12.7606 7.73793 15.0002 10.4999 15.0002C13.261 15.0002 15.4998 12.7606 15.4998 9.99988C15.4998 7.23818 13.261 5 10.4999 5ZM10.4999 13.3335C8.65915 13.3335 7.16671 11.8411 7.16671 9.99988C7.16671 8.15866 8.65915 6.66671 10.4999 6.66671C12.3406 6.66671 13.833 8.15866 13.833 9.99988C13.833 11.8411 12.3406 13.3335 10.4999 13.3335Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@e-bio-cares6618"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#E4D4CF"
                          d="M23.499 7.33s-.233-1.66-.95-2.39c-.91-.95-1.93-.96-2.4-1.02C17.501 3.5 12.5 3.5 12.5 3.5h-.01s-5 0-7.65.42c-.47.06-1.49.07-2.4 1.02-.72.73-.95 2.39-.95 2.39S0 9.17 0 11v1.99c0 1.83.235 3.67.235 3.67s.233 1.66.95 2.39c.91.95 2.1.92 2.64 1.02 1.91.19 7.65.42 7.65.42s5 0 7.65-.42c.47-.06 1.49-.07 2.4-1.02.72-.73.95-2.39.95-2.39s.235-1.83.235-3.67V11c0-1.83-.235-3.67-.235-3.67ZM9.75 15.5V8.5l6.5 3.5-6.5 3.5Z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://api.whatsapp.com/send/?phone=9779701445&text=hello%2C+how+can+i+help+you">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        color="white"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ayur-footer-box">
                <h4>Useful Links</h4>
                <ul className="ayur-links">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/treatments">Treatments</Link>
                  </li>
                  <li>
                    <Link href="/testimonial">Testimonial</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="ayur-footer-box">
                <h4>Contact Info</h4>
                <ul className="ayur-contact-list">
                  <li className="ayur-contact-box">
                    <Image
                      src="/images/location.png"
                      alt="location icon"
                      width={24}
                      height={24}
                    />
                    <p>V.P.O Phoolpur 144026, Near Lambra, Jalandhar(Pb.)India</p>
                  </li>
                  <li className="ayur-contact-box">
                    <Image
                      src="/images/mobile.png"
                      alt="mobile icon"
                      width={24}
                      height={24}
                    />
                    <p>+91 98720-01445</p>
                  </li>
                  <li className="ayur-contact-box">
                    <Image
                      src="/images/email.png"
                      alt="email icon"
                      width={24}
                      height={24}
                    />
                    <p>
                    <a href="mailto:info@ebiocares.com" className="text-white">
  info@ebiocares.com
</a>
                    
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Location */}
            <div className="col-lg-3 col-md-6 col-sm-6" style={{ paddingLeft: 0 }}>
              <div className="ayur-footer-box">
                <h4>Our Location</h4>
                <div className="location-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1491.0042483942966!2d75.55808129787438!3d31.254531647124708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa8123c1222b46f17%3A0x3d6fe4dc89abc523!2sEBio%20Cares!5e0!3m2!1sen!2sin!4v1745211739382!5m2!1sen!2sin"
                    width="250"
                    height="200"
                    style={{ border: 0 }}
                  //  allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="ayur-copyright-para">
              <p>Copyright &copy; 2026. All Right Reserved. E-Bio Cares</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Shapes */}
      <div className="ayur-bgshape ayur-footer-bgshape">
        <Image
          src="/images/footer-left.png"
          alt="footer decoration"
          width={200}
          height={200}
          style={{ marginLeft: "120px" }}
        />
        <Image
          src="/images/footer-right.png"
          alt="footer decoration"
          width={200}
          height={200}
          style={{ animation: "floating 8s infinite alternate" }}
        />
      </div>
    </div>
  )
}
// import Link from "next/link"
// import Image from "next/image"

// // ✅ React Icons for social media
// import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

// // ✅ Lucide for UI icons
// import { Phone, MapPin, Mail } from "lucide-react"

// const quickLinks = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Treatments", href: "/treatments" },
//   { name: "Testimonial", href: "/testimonial" },
//   { name: "Contact", href: "/contact" },
// ]

// const socialLinks = [
//   {
//     name: "Facebook",
//     href: "https://www.facebook.com/share/1AEeiLHkEN/?mibextid=wwXIfr",
//     icon: FaFacebook,
//   },
//   {
//     name: "Instagram",
//     href: "https://www.instagram.com/ebiocaresofficial/",
//     icon: FaInstagram,
//   },
//   {
//     name: "YouTube",
//     href: "https://www.youtube.com/@e-bio-cares6618",
//     icon: FaYoutube,
//   },
//   {
//     name: "WhatsApp",
//     href: "https://api.whatsapp.com/send/?phone=9779701445&text=hello%2C+how+can+i+help+you",
//     icon: Phone,
//   },
// ]

// export default function Footer() {
//   return (
//     <footer className="bg-[#2d5a27] text-white">
//       <div className="container-custom py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//           {/* Logo + Description */}
//           <div>
//             <Image
//               src="/assets/logo/logo-footer.png"
//               alt="E-Bio Cares Logo"
//               width={150}
//               height={75}
//               className="mb-4 rounded"
//             />

//             <p className="text-[#E4D4CF] mb-6">
//               The Best Electropathy, Biopathy & Natural Remedies Holistic Place.
//             </p>

//             <div className="flex gap-3">
//               {socialLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="social-link"
//                   aria-label={link.name}
//                 >
//                   <link.icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="ayur-footer-link">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <ul className="space-y-4">

//               <li className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-[#CD8973] flex-shrink-0 mt-0.5" />
//                 <p className="text-[#E4D4CF]">
//                   V.P.O Phoolpur 144026, Near Lambra, Jalandhar (Pb.) India
//                 </p>
//               </li>

//               <li className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 text-[#CD8973] flex-shrink-0" />
//                 <p className="text-[#E4D4CF]">+91 98720-01445</p>
//               </li>

//               <li className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-[#CD8973] flex-shrink-0" />
//                 <a
//                   href="mailto:info@ebiocares.com"
//                   className="text-[#E4D4CF] hover:text-white"
//                 >
//                   info@ebiocares.com
//                 </a>
//               </li>

//             </ul>
//           </div>

//           {/* Opening Hours */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
//             <ul className="space-y-2 text-[#E4D4CF]">
//               <li className="flex justify-between">
//                 <span>Monday - Friday:</span>
//                 <span>9:00 AM - 6:00 PM</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Saturday:</span>
//                 <span>9:00 AM - 2:00 PM</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Sunday:</span>
//                 <span>Closed</span>
//               </li>
//             </ul>
//           </div>

//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="border-t border-white/20 py-6">
//         <div className="container-custom text-center text-[#E4D4CF]">
//           <p>&copy; {new Date().getFullYear()} E-Bio Cares. All Rights Reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }