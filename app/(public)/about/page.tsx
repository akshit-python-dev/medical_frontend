"use client"

import Image from "next/image"
import Header from "@/components/website/header"
import Footer from "@/components/website/footer"

const benefits = [
  {
    title: "No Surgery Required",
    description: "Our Treatment Methods are non-invasive and gentle on your body.",
  },
  {
    title: "Plant Based Medicine",
    description: "We Strive to provide holistic treatments that align with the natural rhythms of your body.",
  },
  {
    title: "Treatment for a Range of Diseases",
    description: "From Autism to Cancer, our therapies address various health conditions with proven results.",
  },
]

const achievements = [
  "/certifications/indian-csr-award.jpg",
  "/certifications/national-health-award.jpg",
  "/certifications/13.jpg",
  "/certifications/1.jpg",
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Section */}
        <div className="ayur-bread-section">
          <div className="ayur-breadcrumb-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="ayur-bread-content">
                    <h2>ABOUT US</h2>
                    <div className="ayur-bread-list">
                      <span>
                        <a href="/">Home</a>
                      </span>
                      <span className="ayur-active-page">About Us</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="ayur-bgcover ayur-about-sec ayur-inner-about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-about-img">
                  <Image
                    src="/images/e-biocares.png"
                    alt="E-Bio Cares"
                    width={450}
                    height={500}
                    style={{ height: "500px", width: "450px" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-heading-wrap ayur-about-head">
                  <h4>
                    Discover natural healing with E-Bio Cares: Best hospital in Punjab for
                    Electropathy/Biopathy treatment
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Our advanced medical treatment, demonstrating amazing results against a variety of
                    diseases like Autism/ADHD/Brain Disorder, Cerebral Palsy, Cancer, TB, Paralysis,
                    Lung disease, Kidney Failure, Nasal Congestion, and Diabetes. What sets our
                    Electropathy/Biopathy medicine apart is its focus on the cellular level.
                    <br />
                    <br />
                    Recognizing the cell as the structural and functional unit of life, we understand
                    that the entire body is formed from a single cell. Before the cell comes the atom,
                    consisting of a nucleus with subatomic particles - neutrons, protons, and electrons.
                    <br />
                    <br />
                    Our Electropathy/Biopathy Medicine operates seamlessly on the levels of atom, cell,
                    tissues, organ system, and organism. This approach ensures a comprehensive impact,
                    targeting the foundational elements of life to promote overall well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ayur-bgshape ayur-about-bgshape">
            <Image src="/images/bg-shape2.png" alt="bg shape" width={200} height={200} />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="ayur-bgcover ayur-inner-whychoose">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-heading-wrap ayur-about-head">
                  <h5>Benefits</h5>
                  <h3>Discover the Power of Electropathy/Biopathy for Natural Healing</h3>

                  <div className="ayur-whycho-boxwrapper">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="ayur-whycho-box">
                        <div className="ayur-whycho-boximg">
                          <Image
                            src="/images/checkmark.png"
                            alt="checkmark"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ayur-whycho-boxtext">
                          <h3>{benefit.title}</h3>
                          <p>{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="ayur-about-img" style={{ paddingTop: "45px" }}>
                  <Image
                    src="/images/dicover-image.png"
                    alt="Discover Healing"
                    width={500}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ayur-bgshape ayur-about-bgshape">
            <Image src="/images/bg-leaf2.png" alt="bg leaf" width={200} height={200} />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="ayur-bgcover ayur-team-sec pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-heading-wrap">
                  <h5>E-Bio Cares</h5>
                  <h3>Achievements</h3>
                </div>
              </div>
            </div>

            <div className="row">
              {achievements.map((image, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                  <div className="ayur-team-box">
                    <div className="ayur-team-img-wrapper">
                      <div className="ayur-team-img">
                        <Image
                          src={image}
                          alt={`Achievement ${index + 1}`}
                          width={300}
                          height={350}
                          style={{ height: "350px", width: "300px" }}
                        />
                      </div>
                      <div className="ayur-team-hoverimg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ayur-bgshape ayur-team-bgshape">
            <Image src="/images/bg-shape5.png" alt="bg shape" width={200} height={200} />
            <Image src="/images/bg-leaf5.png" alt="bg leaf" width={200} height={200} />
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
// import { Check } from "lucide-react"

// const benefits = [
//   {
//     title: "No Surgery Required",
//     description: "Our Treatment Methods are non-invasive and gentle on your body.",
//   },
//   {
//     title: "Plant Based Medicine",
//     description: "We Strive to provide holistic treatments that align with the natural rhythms of your body.",
//   },
//   {
//     title: "Treatment for a Range of Diseases",
//     description: "From Autism to Cancer, our therapies address various health conditions with proven results.",
//   },
// ]

// const achievements = [
//   "/assets/certifications/indian-csr-award.jpg",
//   "/assets/certifications/national-health-award.jpg",
//   "/assets/certifications/13.jpg",
//   "/assets/certifications/1.jpg",
// ]

// export default function AboutPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="ABOUT US" currentPage="About Us" />

//         {/* About Section */}
//         <section className="py-16 md:py-24 bg-[#f6f1ed] relative overflow-hidden">
//           <div className="container-custom">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div className="relative">
//                 <div className="rounded-2xl overflow-hidden shadow-xl">
//                   <Image
//                     src="/assets/images/e-biocares.png"
//                     alt="E-Bio Cares"
//                     width={450}
//                     height={500}
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-lg md:text-xl text-[#CD8973] font-semibold mb-4">
//                   Discover natural healing with E-Bio Cares: Best hospital in Punjab for
//                   Electropathy/Biopathy treatment
//                 </h4>
//                 <p className="text-gray-600 text-justify mb-4">
//                   Our advanced medical treatment, demonstrating amazing results against a variety of
//                   diseases like Autism/ADHD/Brain Disorder, Cerebral Palsy, Cancer, TB, Paralysis,
//                   Lung disease, Kidney Failure, Nasal Congestion, and Diabetes. What sets our
//                   Electropathy/Biopathy medicine apart is its focus on the cellular level.
//                 </p>
//                 <p className="text-gray-600 text-justify mb-4">
//                   Recognizing the cell as the structural and functional unit of life, we understand
//                   that the entire body is formed from a single cell. Before the cell comes the atom,
//                   consisting of a nucleus with subatomic particles - neutrons, protons, and electrons.
//                 </p>
//                 <p className="text-gray-600 text-justify">
//                   Our Electropathy/Biopathy Medicine operates seamlessly on the levels of atom, cell,
//                   tissues, organ system, and organism. This approach ensures a comprehensive impact,
//                   targeting the foundational elements of life to promote overall well-being.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Benefits Section */}
//         <section className="py-16 md:py-24 bg-white relative overflow-hidden">
//           <div className="container-custom">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h5 className="text-[#CD8973] font-semibold mb-2">Benefits</h5>
//                 <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
//                   Discover the Power of Electropathy/Biopathy for Natural Healing
//                 </h3>

//                 <div className="space-y-6">
//                   {benefits.map((benefit, index) => (
//                     <div key={index} className="flex items-start gap-4">
//                       <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center flex-shrink-0">
//                         <Check className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <h4 className="text-xl font-semibold text-gray-800 mb-1">{benefit.title}</h4>
//                         <p className="text-gray-600">{benefit.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="rounded-2xl overflow-hidden shadow-xl">
//                   <Image
//                     src="/assets/images/dicover-image.png"
//                     alt="Discover Healing"
//                     width={500}
//                     height={400}
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Achievements Section */}
//         <section className="py-16 md:py-24 bg-[#f6f1ed]">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h5 className="text-[#CD8973] font-semibold mb-2">E-Bio Cares</h5>
//               <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Achievements</h3>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {achievements.map((image, index) => (
//                 <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
//                   <Image
//                     src={image}
//                     alt={`Achievement ${index + 1}`}
//                     width={300}
//                     height={350}
//                     className="w-full h-[350px] object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }
