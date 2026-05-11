"use client";

import { useState } from "react";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import Breadcrumb from "@/components/website/breadcrumb";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb with background image */}
        <div
          className="ayur-bread-section"
          style={{ backgroundImage: "url('/images/banner.jpg')" }}
        >
          <div className="ayur-breadcrumb-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="ayur-bread-content">
                    <h2>CONTACT US</h2>
                    <div className="ayur-bread-list">
                      <span>
                        <a href="/">Home</a>
                      </span>
                      <span className="ayur-active-page">Contact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Page Section */}
        <div className="ayur-bgcover ayur-contactpage-wrapper">
          <div className="container">
            <div className="ayur-contactpage-box">
              {/* Google Map */}
              <div className="ayur-contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1491.0042483942966!2d75.55808129787438!3d31.254531647124708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa8123c1222b46f17%3A0x3d6fe4dc89abc523!2sEBio%20Cares!5e0!3m2!1sen!2sin!4v1745211739382!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="E-Bio Cares Location"
                />
              </div>

              {/* Contact Form */}
              <div className="ayur-contact-pageinfo">
                <div className="ayur-contact-heading">
                  <h3>Get in touch with us</h3>
                  <h4>Send Us A Message</h4>
                </div>
                <div className="ayur-contact-form-wrapper">
                  <form onSubmit={handleSubmit} className="ayur-contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className="form-control require"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="form-control require"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control require"
                            data-valid="email"
                            data-error="Email should be valid."
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="form-control require"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="ayur-form-input">
                          <textarea
                            name="message"
                            cols={3}
                            rows={8}
                            placeholder="Your Message..."
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-control require"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          type="submit"
                          name="submit"
                          className="ayur-btn ayur-con-btn submitForm"
                        >
                          Send Message
                        </button>
                        <div className="response"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
// "use client"

// import { useState } from "react"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     subject: "",
//     message: "",
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission
//     console.log("Form submitted:", formData)
//     alert("Thank you for your message. We will get back to you soon!")
//   }

//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="CONTACT US" currentPage="Contact" />

//         <section className="py-16 md:py-24 bg-[#f6f1ed]">
//           <div className="container-custom">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 {/* Map */}
//                 <div className="h-[400px] lg:h-auto">
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1491.0042483942966!2d75.55808129787438!3d31.254531647124708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa8123c1222b46f17%3A0x3d6fe4dc89abc523!2sEBio%20Cares!5e0!3m2!1sen!2sin!4v1745211739382!5m2!1sen!2sin"
//                     width="100%"
//                     height="100%"
//                     style={{ border: 0, minHeight: "400px" }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="E-Bio Cares Location"
//                   />
//                 </div>

//                 {/* Contact Form */}
//                 <div className="p-8 md:p-12">
//                   <div className="mb-8">
//                     <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//                       Get in touch with us
//                     </h3>
//                     <h4 className="text-lg text-[#CD8973]">Send Us A Message</h4>
//                   </div>

//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="text"
//                         name="firstname"
//                         placeholder="First Name"
//                         value={formData.firstname}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-[#f6f1ed] border border-transparent rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                       <input
//                         type="text"
//                         name="lastname"
//                         placeholder="Last Name"
//                         value={formData.lastname}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-[#f6f1ed] border border-transparent rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Your Email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-[#f6f1ed] border border-transparent rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                       <input
//                         type="text"
//                         name="subject"
//                         placeholder="Subject"
//                         value={formData.subject}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-[#f6f1ed] border border-transparent rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                     </div>
//                     <textarea
//                       name="message"
//                       rows={6}
//                       placeholder="Your Message..."
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 bg-[#f6f1ed] border border-transparent rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                       required
//                     />
//                     <button type="submit" className="ayur-btn">
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }
