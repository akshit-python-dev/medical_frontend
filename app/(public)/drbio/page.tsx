"use client"

import Image from "next/image"
import Header from "@/components/website/header"
import Footer from "@/components/website/footer"

export default function DrBioPage() {
  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Section */}
        <div
          className="ayur-bread-section"
          style={{ backgroundImage: "url('/images/banner.jpg')" }}
        >
          <div className="ayur-breadcrumb-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="ayur-bread-content">
                    <h2>BIOGRAPHY</h2>
                    <div className="ayur-bread-list">
                      <span>
                        <a href="/">Home</a>
                      </span>
                      <span className="ayur-active-page">Biopgraphy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="ayur-bgcover ayur-about-sec ayur-inner-about pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-about-img">
                  <Image
                    src="/images/drbio.jpg"
                    alt="Dr. Jaswinder Singh"
                    width={500}
                    height={400}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-heading-wrap ayur-about-head">
                  <h4>Renowned Electropathy/Biopathy Specialist</h4>
                  <h3 style={{ color: "brown" }}>Dr. Jaswinder Singh</h3>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ color: "green" }}>
                      M.D., B.E.M.S (Electropathy/Biopathy Medicine).
                    </span>
                    <br />
                    He is one of the best doctor in electropathy who earns a noteworthy position
                    worldwide. He became pretty famous by treating thousands of Autism/ADHD, Brain
                    Disorder and even Cancer patients through his own invented Electropathy and
                    Biopathy medicine with 0% side effects.
                    <br />
                    <br />
                    With an experience of over 30 years he also has a keen interest in research &
                    social work. He aims to provide the best medical treatment to every patient.
                    <br />
                    <br />
                    He is also the founder of Biopathy treatment practices and medicines which has
                    been originated from Electropathy and Ayurvedic natural combinations. Through
                    his research and invention he cured many chronic diseases and registered his
                    name as World Record Holder. He has been awarded several times for his
                    phenomenal work like National Health Care Award, Global Health Care World and
                    many more.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Content Section */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 p-b-1">
                <div className="ayur-heading-wrap ayur-about-head">
                  <p style={{ textAlign: "justify", paddingTop: "0px" }}>
                    At E-BIO-CARES, we stand at the forefront of medical research, constantly
                    adapting to advancements in healthcare. While some diseases may be considered
                    incurable, our dedication to exploring new treatments reflects our belief in
                    the potential for positive change in patients&apos; lives. Join us on this
                    transformative journey towards better health and well-being.
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    The visionary behind this initiative, Dr. Jaswinder Singh, has dedicated his
                    life to exploring alternative and integrative medicine. With decades of
                    hands-on experience and extensive research, he has developed a unique
                    diagnostic system based on the analysis of pulse, nails, tongue, and eyes.
                    This method allows for a precise understanding of the patient&apos;s condition,
                    enabling us to tailor treatments that align with their individual needs and
                    promote holistic healing.
                    <br />
                    <br />
                    At E-BIO-CARES, we strive to combine traditional wisdom with modern
                    advancements, ensuring that every patient receives the highest standard of
                    natural healthcare. Our relentless pursuit of innovative treatments is driven
                    by a deep-seated belief in compassion, excellence, and a commitment to
                    transforming lives.
                    <br />
                    <br />
                    Join us in our journey toward a healthier, disease-free world—because at
                    E-BIO-CARES, your well-being is our priority.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Shapes */}
          <div className="ayur-bgshape ayur-about-bgshape">
            <Image src="/images/bg-shape2.png" alt="bg shape" width={200} height={200} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// import Image from "next/image"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"

// export default function DrBioPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="BIOGRAPHY" currentPage="Biography" />

//         {/* Biography Section */}
//         <section className="py-16 md:py-24 bg-[#f6f1ed] relative overflow-hidden">
//           <div className="container-custom">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
//               <div className="relative">
//                 <div className="rounded-2xl overflow-hidden shadow-xl">
//                   <Image
//                     src="/images/drbio.jpg"
//                     alt="Dr. Jaswinder Singh"
//                     width={500}
//                     height={400}
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-lg text-[#CD8973] font-semibold mb-2">
//                   Renowned Electropathy/Biopathy Specialist
//                 </h4>
//                 <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4">
//                   Dr. Jaswinder Singh
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   <span className="text-[#2d5a27] font-semibold">
//                     M.D., B.E.M.S (Electropathy/Biopathy Medicine).
//                   </span>
//                 </p>
//                 <p className="text-gray-600 mb-4 text-justify">
//                   He is one of the best doctor in electropathy who earns a noteworthy position
//                   worldwide. He became pretty famous by treating thousands of Autism/ADHD, Brain
//                   Disorder and even Cancer patients through his own invented Electropathy and Biopathy
//                   medicine with 0% side effects.
//                 </p>
//                 <p className="text-gray-600 mb-4 text-justify">
//                   With an experience of over 30 years he also has a keen interest in research & social
//                   work. He aims to provide the best medical treatment to every patient.
//                 </p>
//                 <p className="text-gray-600 text-justify">
//                   He is also the founder of Biopathy treatment practices and medicines which has been
//                   originated from Electropathy and Ayurvedic natural combinations. Through his
//                   research and invention he cured many chronic diseases and registered his name as
//                   World Record Holder. He has been awarded several times for his phenomenal work like
//                   National Health Care Award, Global Health Care World and many more.
//                 </p>
//               </div>
//             </div>

//             {/* Additional Content */}
//             <div className="prose max-w-none">
//               <p className="text-gray-600 text-justify mb-6">
//                 At E-BIO-CARES, we stand at the forefront of medical research, constantly adapting to
//                 advancements in healthcare. While some diseases may be considered incurable, our
//                 dedication to exploring new treatments reflects our belief in the potential for
//                 positive change in patients&apos; lives. Join us on this transformative journey towards
//                 better health and well-being.
//               </p>
//               <p className="text-gray-600 text-justify mb-6">
//                 The visionary behind this initiative, Dr. Jaswinder Singh, has dedicated his life to
//                 exploring alternative and integrative medicine. With decades of hands-on experience
//                 and extensive research, he has developed a unique diagnostic system based on the
//                 analysis of pulse, nails, tongue, and eyes. This method allows for a precise
//                 understanding of the patient&apos;s condition, enabling us to tailor treatments that align
//                 with their individual needs and promote holistic healing.
//               </p>
//               <p className="text-gray-600 text-justify mb-6">
//                 At E-BIO-CARES, we strive to combine traditional wisdom with modern advancements,
//                 ensuring that every patient receives the highest standard of natural healthcare. Our
//                 relentless pursuit of innovative treatments is driven by a deep-seated belief in
//                 compassion, excellence, and a commitment to transforming lives.
//               </p>
//               <p className="text-gray-600 text-justify">
//                 Join us in our journey toward a healthier, disease-free world—because at E-BIO-CARES,
//                 your well-being is our priority.
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }
