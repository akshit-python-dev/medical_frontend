import Image from "next/image";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import Breadcrumb from "@/components/website/breadcrumb";

const awards = [
  {
    title: "Indian CSR Award",
    image: "/awards/csr-award.jpg",
    description: `In recognition of his exceptional contributions to healthcare and social responsibility, Dr. Jaswinder Singh was honored with the prestigious Indian CSR Award in 2024. This award celebrates his tireless efforts in making holistic and alternative medicine accessible to all, particularly in underserved communities.

Under his leadership, E-BIO-CARES has pioneered innovative treatments, research initiatives, and patient-centric care, setting new benchmarks in integrative medicine. His commitment to affordable and effective healthcare solutions has not only earned him global acclaim but has also reinforced the importance of alternative medicine in mainstream healthcare.`,
    reverse: false,
  },
  {
    title: "National Health Care Award",
    image: "/awards/national-health-education.jpg",
    description: `We are immensely proud to announce that Dr. Jaswinder Singh, a globally renowned electropathy Expert, has been honored with the National Health Care & Wellness Award on October 18, 2024, at Radisson Blu, Dwarka, New Delhi. This prestigious recognition celebrates his remarkable contributions to electropathy, alternative medicine, and holistic healthcare.

This award is a testament to his unwavering dedication, innovative approach, and compassionate patient care. Dr. Jaswinder Singh's journey inspires us all, proving that with relentless research and a deep commitment to healing, even the most challenging diseases can be approached with hope and confidence.`,
    reverse: true,
  },
  {
    title: "International Award Summit 2025",
    image: "/awards/IMG_4468.jpg",
    description: `Dr. Jaswinder Singh, a globally renowned expert in electropathy Medicine, has been honored with the prestigious International Award Summit 2025 for his outstanding contributions to the field of alternative medicine. The grand ceremony was held at Hotel Holiday Inn, Aerocity, New Delhi (India), where leading medical experts, researchers, and dignitaries gathered to celebrate excellence in healthcare innovation.

With over 30 years of experience, Dr. Jaswinder Singh has revolutionized the treatment of complex conditions such as Autism, ADHD, Speech Disorder, Cerebral Palsy and Cancer through electropathy and biopathy medicine. His commitment to research, education, and patient care has earned him a significant reputation worldwide.`,
    reverse: false,
  },
  {
    title: "Global Health Care Award",
    image: "/awards/global-health-award.jpg",
    description: `We are proud to announce that Dr. Jaswinder Singh, a renowned electropathy expert, has been honored with the prestigious Global Health Care Award 2025 for his remarkable contributions to alternative and integrative medicine. The award ceremony was held at Hotel Holiday Inn, Aerocity, New Delhi, India, recognizing his unparalleled dedication to patient care, medical research, and holistic healing.

With over 30 years of experience, Dr. Jaswinder Singh has successfully treated hundreds of patients battling Autism, Cancer, and chronic illnesses through electropathy medicine. His pioneering work in pulse, nail, tongue, and eye analysis has revolutionized diagnostic methods, allowing for highly personalized treatment approaches.

As the visionary behind E-BIO-CARES, he continues to push the boundaries of natural healthcare, blending traditional wisdom with modern advancements.`,
    reverse: true,
  },
  {
    title: "Indo International Success Journey of Achievers",
    image: "/awards/3.jpg",
    description: `We proudly celebrate Dr. Jaswinder Singh, a globally renowned electropathy Expert, for his extraordinary contributions to alternative medicine. With over 25 years of experience, he has transformed lives through electropathy, herbal medicine, and holistic healing, earning him a distinguished position in the medical field.

His groundbreaking work in treating Autism, Cancer, and chronic illnesses has brought new hope to countless patients. As the visionary behind E-BIO-CARES, Dr. Singh has pioneered a unique diagnostic system based on pulse, nails, tongue, and eye analysis, enabling personalized treatments that promote holistic well-being.`,
    reverse: false,
  },
];

export default function AwardsPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="ACHIEVEMENTS AT GLANCE" currentPage="Achievements" />

        {awards.map((award, idx) => {
          // Alternate container classes to mirror HTML's alternating sections
          const isEven = idx % 2 === 0;
          const containerClass = isEven
            ? "ayur-bgcover ayur-about-sec ayur-inner-about pb-0"
            : "ayur-bgcover ayur-inner-whychoose pb-0";

          // Even index rows: image left, text right (unless reversed)
          // Odd index rows: image right, text left (unless reversed)
          // But award.reverse toggles specifically for that item
          // We'll build the grid accordingly
          const imageFirst = isEven ? !award.reverse : award.reverse;

          return (
            <section
              key={idx}
              className={`${containerClass} relative overflow-hidden`}
            >
              <div className="container">
                <div className="row items-center">
                  {imageFirst ? (
                    <>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-about-img" data-tilt data-tilt-max="10" data-tilt-speed="1000" data-tilt-perspective="1000">
                          <Image
                            src={award.image}
                            alt={award.title}
                            width={500}
                            height={400}
                            className="img-fluid w-100 h-auto object-cover"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-about-head">
                          <h3>{award.title}</h3>
                          {award.description.split("\n\n").map((para, pIdx) => (
                            <p key={pIdx} style={{ color: "#000" }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-about-head">
                          <h3>{award.title}</h3>
                          {award.description.split("\n\n").map((para, pIdx) => (
                            <p key={pIdx} style={{ color: "#000" }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-about-img" data-tilt data-tilt-max="10" data-tilt-speed="1000" data-tilt-perspective="1000">
                          <Image
                            src={award.image}
                            alt={award.title}
                            width={500}
                            height={400}
                            className="img-fluid w-100 h-auto object-cover"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Background shape images as in HTML */}
              <div className="ayur-bgshape ayur-about-bgshape">
                <img
                  src={
                    isEven
                      ? "/images/bg-shape2.png"
                      : "/images/bg-leaf2.png"
                  }
                  alt="bg shape"
                />
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
// import Image from "next/image"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"

// const awards = [
//   {
//     title: "Indian CSR Award",
//     image: "/awards/csr-award.jpg",
//     description: `In recognition of his exceptional contributions to healthcare and social responsibility, Dr. Jaswinder Singh was honored with the prestigious Indian CSR Award in 2024. This award celebrates his tireless efforts in making holistic and alternative medicine accessible to all, particularly in underserved communities.

// Under his leadership, E-BIO-CARES has pioneered innovative treatments, research initiatives, and patient-centric care, setting new benchmarks in integrative medicine. His commitment to affordable and effective healthcare solutions has not only earned him global acclaim but has also reinforced the importance of alternative medicine in mainstream healthcare.`,
//     reverse: false,
//   },
//   {
//     title: "National Health Care Award",
//     image: "/assets/awards/national-health-education.jpg",
//     description: `We are immensely proud to announce that Dr. Jaswinder Singh, a globally renowned electropathy Expert, has been honored with the National Health Care & Wellness Award on October 18, 2024, at Radisson Blu, Dwarka, New Delhi. This prestigious recognition celebrates his remarkable contributions to electropathy, alternative medicine, and holistic healthcare.

// This award is a testament to his unwavering dedication, innovative approach, and compassionate patient care. Dr. Jaswinder Singh's journey inspires us all, proving that with relentless research and a deep commitment to healing, even the most challenging diseases can be approached with hope and confidence.`,
//     reverse: true,
//   },
//   {
//     title: "International Award Summit 2025",
//     image: "/assets/awards/IMG_4468.jpg",
//     description: `Dr. Jaswinder Singh, a globally renowned expert in electropathy Medicine, has been honored with the prestigious International Award Summit 2025 for his outstanding contributions to the field of alternative medicine. The grand ceremony was held at Hotel Holiday Inn, Aerocity, New Delhi (India), where leading medical experts, researchers, and dignitaries gathered to celebrate excellence in healthcare innovation.

// With over 30 years of experience, Dr. Jaswinder Singh has revolutionized the treatment of complex conditions such as Autism, ADHD, Speech Disorder, Cerebral Palsy and Cancer through electropathy and biopathy medicine. His commitment to research, education, and patient care has earned him a significant reputation worldwide.`,
//     reverse: false,
//   },
//   {
//     title: "Global Health Care Award",
//     image: "/assets/awards/global-health-award.jpg",
//     description: `We are proud to announce that Dr. Jaswinder Singh, a renowned electropathy expert, has been honored with the prestigious Global Health Care Award 2025 for his remarkable contributions to alternative and integrative medicine. The award ceremony was held at Hotel Holiday Inn, Aerocity, New Delhi, India, recognizing his unparalleled dedication to patient care, medical research, and holistic healing.

// With over 30 years of experience, Dr. Jaswinder Singh has successfully treated hundreds of patients battling Autism, Cancer, and chronic illnesses through electropathy medicine. His pioneering work in pulse, nail, tongue, and eye analysis has revolutionized diagnostic methods, allowing for highly personalized treatment approaches.

// As the visionary behind E-BIO-CARES, he continues to push the boundaries of natural healthcare, blending traditional wisdom with modern advancements.`,
//     reverse: true,
//   },
//   {
//     title: "Indo International Success Journey of Achievers",
//     image: "/assets/awards/3.jpg",
//     description: `We proudly celebrate Dr. Jaswinder Singh, a globally renowned electropathy Expert, for his extraordinary contributions to alternative medicine. With over 25 years of experience, he has transformed lives through electropathy, herbal medicine, and holistic healing, earning him a distinguished position in the medical field.

// His groundbreaking work in treating Autism, Cancer, and chronic illnesses has brought new hope to countless patients. As the visionary behind E-BIO-CARES, Dr. Singh has pioneered a unique diagnostic system based on pulse, nails, tongue, and eye analysis, enabling personalized treatments that promote holistic well-being.`,
//     reverse: false,
//   },
// ]

// export default function AwardsPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="ACHIEVEMENTS AT GLANCE" currentPage="Achievements" />

//         {awards.map((award, index) => (
//           <section
//             key={index}
//             className={`py-16 md:py-20 ${index % 2 === 0 ? "bg-[#f6f1ed]" : "bg-white"} relative overflow-hidden`}
//           >
//             <div className="container-custom">
//               <div
//                 className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
//                   award.reverse ? "lg:flex-row-reverse" : ""
//                 }`}
//               >
//                 <div className={`${award.reverse ? "lg:order-2" : ""}`}>
//                   <div className="rounded-2xl overflow-hidden shadow-xl">
//                     <Image
//                       src={award.image}
//                       alt={award.title}
//                       width={500}
//                       height={400}
//                       className="w-full h-auto object-cover"
//                     />
//                   </div>
//                 </div>

//                 <div className={`${award.reverse ? "lg:order-1" : ""}`}>
//                   <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{award.title}</h3>
//                   {award.description.split("\n\n").map((paragraph, pIndex) => (
//                     <p key={pIndex} className="text-gray-600 text-justify mb-4">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         ))}
//       </main>
//       <Footer />
//     </>
//   )
// }
