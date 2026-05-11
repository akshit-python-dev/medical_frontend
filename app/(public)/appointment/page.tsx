"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import Breadcrumb from "@/components/website/breadcrumb";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    date: "",
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
    alert("Thank you for your appointment request. We will contact you soon!");
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
                    <h2>APPOINTMENT</h2>
                    <div className="ayur-bread-list">
                      <span>
                        <a href="/">Home</a>
                      </span>
                      <span className="ayur-active-page">Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact / Appointment Section */}
        <div className="ayur-bgcover ayur-contactpage-wrapper">
          <div className="container">
            <div
              className="ayur-contactpage-box"
              style={{ border: "2px solid black" }}
            >
              {/* Image Column */}
              <div className="ayur-contact-map">
                <img
                  style={{ marginLeft: "30px", height: "450px", width: "400px" }}
                  src="/images/appointment.jpg"
                  alt="Book Appointment"
                />
              </div>

              {/* Form Column */}
              <div className="ayur-contact-pageinfo">
                <div className="ayur-contact-heading">
                  <h3 style={{ paddingTop: "40px" }}>
                    <center>Book An Appointment</center>
                  </h3>
                </div>
                <div className="ayur-contact-form-wrapper">
                  <form
                    onSubmit={handleSubmit}
                    className="ayur-contact-form"
                  >
                    <div className="row" style={{ marginBottom: "20px" }}>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="text"
                            name="name"
                            placeholder="First Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-control require"
                            style={{ border: "1px solid black" }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="form-control require"
                            style={{ border: "1px solid black" }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email (Optional)"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control require"
                            style={{ border: "1px solid black" }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="ayur-form-input">
                          <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="form-control require"
                            style={{ border: "1px solid black" }}
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
                            placeholder="Describe an Issue you are Facing"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-control require"
                            style={{ border: "1px solid black" }}
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
                          Submit
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
// import Image from "next/image"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"

// export default function AppointmentPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     date: "",
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
//     alert("Thank you for your appointment request. We will contact you soon!")
//   }

//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="APPOINTMENT" currentPage="Appointment" />

//         <section className="py-16 md:py-24 bg-[#f6f1ed]">
//           <div className="container-custom">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-800">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 {/* Image */}
//                 <div className="p-8 flex items-center justify-center bg-gray-50">
//                   <Image
//                     src="/assets/images/appointment.jpg"
//                     alt="Book Appointment"
//                     width={400}
//                     height={450}
//                     className="rounded-xl shadow-lg max-w-full h-auto"
//                   />
//                 </div>

//                 {/* Appointment Form */}
//                 <div className="p-8 md:p-12">
//                   <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
//                     Book An Appointment
//                   </h3>

//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="First Name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                       <input
//                         type="text"
//                         name="contact"
//                         placeholder="Contact"
//                         value={formData.contact}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Your Email (Optional)"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                       />
//                       <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                         required
//                       />
//                     </div>
//                     <textarea
//                       name="message"
//                       rows={6}
//                       placeholder="Describe an Issue you are Facing"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973] transition-colors"
//                       required
//                     />
//                     <button type="submit" className="ayur-btn w-full md:w-auto">
//                       Submit
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
