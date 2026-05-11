import Image from "next/image";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import Breadcrumb from "@/components/website/breadcrumb";

const records = [
  {
    title: "Exclusive World Records",
    image: "/records/1.jpg",
    description: `Dr. Jaswinder Singh, a global pioneer in electropathy and holistic medicine, for achieving Exclusive World Records in 2025 - a testament to his unparalleled contributions to alternative and integrative healthcare.

As the driving force behind E-BIO-CARES, he has redefined medical possibilities, proving that dedication, research, and compassion can push the boundaries of what was once deemed incurable. His tireless efforts in training, education, and medical research have not only enhanced patient care but also paved the way for future generations of holistic healers.

This prestigious world record achievement acknowledges Dr. Jaswinder Singh's extraordinary impact on global health, his commitment to excellence, and his unwavering belief in the power of electropathy to transform lives.`,
    reverse: false,
  },
  {
    title: "Indo International Achievers Journey Award",
    image: "/records/2.jpg",
    description: `Dr. Jaswinder Singh, a globally renowned electropathy Expert, for his extraordinary contributions to alternative medicine. With over 30 years of experience, he has transformed lives through electropathy, biopathy, herbal medicine, and holistic healing, earning him a distinguished position in the medical field.

His groundbreaking work in treating Autism, ADHD, Speech Disorder, Cerebral Palsy, Cancer, and many other Chronic illnesses has brought new hope to countless patients. As the visionary behind E-BIO-CARES, Dr. Singh has pioneered a unique diagnostic system based on pulse, nails, tongue, and eye analysis, enabling personalized treatments that promote holistic well-being.`,
    reverse: true,
  },
];

export default function RecordsPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="OUR RECORDS" currentPage="Records" />

        {records.map((record, idx) => {
          // Use same alternating container classes as awards page (HTML structure)
          const isEven = idx % 2 === 0;
          // For records, the first section uses "ayur-about-sec", second uses same but with pt-0
          // We'll use a consistent approach: first section normal padding, second with pt-0
          const containerClass = isEven
            ? "ayur-bgcover ayur-about-sec ayur-inner-about"
            : "ayur-bgcover ayur-about-sec ayur-inner-about pt-0";

          // Determine order: for even index (first record) image left, text right
          // For odd index (second record) text left, image right
          // But record.reverse indicates if image should be reversed from default
          // Based on HTML: first record image left, second record text left (image right)
          // So:
          // - Even index (0): default image left (no reverse needed)
          // - Odd index (1): default image right (text left)
          // The record.reverse property already matches this (first: false, second: true)
          // So we can just use record.reverse to decide image placement
          const imageFirst = !record.reverse;

          return (
            <section
              key={idx}
              className={`${containerClass} relative overflow-hidden`}
            >
              <div className="container">
                <div className="row">
                  {imageFirst ? (
                    <>
                      {/* Image Column */}
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          className="ayur-about-img"
                          data-tilt
                          data-tilt-max="10"
                          data-tilt-speed="1000"
                          data-tilt-perspective="1000"
                        >
                          <Image
                            src={record.image}
                            alt={record.title}
                            width={500}
                            height={400}
                            className="img-fluid w-100 h-auto object-cover"
                          />
                        </div>
                      </div>
                      {/* Text Column */}
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-about-head">
                          <h3>{record.title}</h3>
                          {record.description.split("\n\n").map((para, pIdx) => (
                            <p key={pIdx} style={{ textAlign: "justify", color: "#000" }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Text Column (left) */}
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-about-head">
                          <h3>{record.title}</h3>
                          {record.description.split("\n\n").map((para, pIdx) => (
                            <p key={pIdx} style={{ textAlign: "justify", color: "#000" }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                      {/* Image Column (right) */}
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          className="ayur-about-img"
                          data-tilt
                          data-tilt-max="10"
                          data-tilt-speed="1000"
                          data-tilt-perspective="1000"
                        >
                          <Image
                            src={record.image}
                            alt={record.title}
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
              {/* Background shape image - same for both sections */}
              <div className="ayur-bgshape ayur-about-bgshape">
                <img src="/images/bg-shape2.png" alt="bg shape" />
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

// const records = [
//   {
//     title: "Exclusive World Records",
//     image: "/records/1.jpg",
//     description: `Dr. Jaswinder Singh, a global pioneer in electropathy and holistic medicine, for achieving Exclusive World Records in 2025 - a testament to his unparalleled contributions to alternative and integrative healthcare.

// As the driving force behind E-BIO-CARES, he has redefined medical possibilities, proving that dedication, research, and compassion can push the boundaries of what was once deemed incurable. His tireless efforts in training, education, and medical research have not only enhanced patient care but also paved the way for future generations of holistic healers.

// This prestigious world record achievement acknowledges Dr. Jaswinder Singh's extraordinary impact on global health, his commitment to excellence, and his unwavering belief in the power of electropathy to transform lives.`,
//     reverse: false,
//   },
//   {
//     title: "Indo International Achievers Journey Award",
//     image: "/assets/records/2.jpg",
//     description: `Dr. Jaswinder Singh, a globally renowned electropathy Expert, for his extraordinary contributions to alternative medicine. With over 30 years of experience, he has transformed lives through electropathy, biopathy, herbal medicine, and holistic healing, earning him a distinguished position in the medical field.

// His groundbreaking work in treating Autism, ADHD, Speech Disorder, Cerebral Palsy, Cancer, and many other Chronic illnesses has brought new hope to countless patients. As the visionary behind E-BIO-CARES, Dr. Singh has pioneered a unique diagnostic system based on pulse, nails, tongue, and eye analysis, enabling personalized treatments that promote holistic well-being.`,
//     reverse: true,
//   },
// ]

// export default function RecordsPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="OUR RECORDS" currentPage="Records" />

//         {records.map((record, index) => (
//           <section
//             key={index}
//             className={`py-16 md:py-20 ${index % 2 === 0 ? "bg-[#f6f1ed]" : "bg-white"} relative overflow-hidden`}
//           >
//             <div className="container-custom">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                 <div className={`${record.reverse ? "lg:order-2" : ""}`}>
//                   <div className="rounded-2xl overflow-hidden shadow-xl">
//                     <Image
//                       src={record.image}
//                       alt={record.title}
//                       width={500}
//                       height={400}
//                       className="w-full h-auto object-cover"
//                     />
//                   </div>
//                 </div>

//                 <div className={`${record.reverse ? "lg:order-1" : ""}`}>
//                   <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{record.title}</h3>
//                   {record.description.split("\n\n").map((paragraph, pIndex) => (
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
