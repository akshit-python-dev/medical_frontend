import Image from "next/image"
import Link from "next/link"

export default function DrBioSection() {
  return (
    <section className="py-16 md:py-24 ayur-bgcover ayur-achievement-sec">
      <div className="container">
        <div className="row">
          {/* Image */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-about-img">
              <Image
                src="/images/drbio.jpg"
                alt="Dr. Jaswinder Singh"
                width={500}
                height={348}
                className="img-fluid"
                style={{ height: '348px', width: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-about-head">
              <h4>Renowned Electropathy/Biopathy Expert</h4>
              <h3 style={{ color: 'brown' }}>Dr. Jaswinder Singh</h3>
              <p style={{ textAlign: 'justify' }}>
                <span style={{ color: 'green' }}>M.D., B.E.M.S (Electropathy/Biopathy Medicine).</span>
                <br />
                He is one of the best doctors in electropathy who earns a noteworthy position worldwide. He became pretty famous by treating thousands of Autism/ADHD, Brain Disorder and even Cancer patients through his own invented Electropathy and Biopathy.
                <br /><br />
                With an experience of over 30 years he also has a keen interest in research & social work. He aims to provide the best medical treatment to every patient.
                <br /><br />
                He is also the founder of Biopathy treatment practices and medicines which has been originated from Electropathy and Ayurvedic natural combinations. Through his research and invention he cured many chronic diseases and registered his name as World Record Holder. He has been awarded several times for his phenomenal work like National Health Care Award, Global Health Care World and many more.
              </p>
              <Link href="/drbio" className="ayur-btn">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// import Image from "next/image"
// import Link from "next/link"

// export default function DrBioSection() {
//   return (
//     <section className="py-16 md:py-24 bg-[#f6f1ed]">
//       <div className="container-custom">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Image */}
//           <div className="relative">
//             <div className="relative rounded-2xl overflow-hidden shadow-xl">
//               <Image
//                 src="/images/drbio.jpg"
//                 alt="Dr. Jaswinder Singh"
//                 width={500}
//                 height={350}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//             {/* Decorative elements */}
//             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#CD8973]/20 rounded-full -z-10" />
//             <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#2d5a27]/20 rounded-full -z-10" />
//           </div>

//           {/* Content */}
//           <div>
//             <h4 className="text-lg text-[#CD8973] font-semibold mb-2">
//               Renowned Electropathy/Biopathy Expert
//             </h4>
//             <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
//               Dr. Jaswinder Singh
//             </h3>
//             <p className="text-gray-700 mb-4">
//               <span className="text-[#2d5a27] font-semibold">
//                 M.D., B.E.M.S (Electropathy/Biopathy Medicine).
//               </span>
//             </p>
//             <p className="text-gray-600 mb-4 text-justify">
//               He is one of the best doctors in electropathy who earns a noteworthy position worldwide.
//               He became pretty famous by treating thousands of Autism/ADHD, Brain Disorder and even
//               Cancer patients through his own invented Electropathy and Biopathy.
//             </p>
//             <p className="text-gray-600 mb-4 text-justify">
//               With an experience of over 30 years he also has a keen interest in research & social
//               work. He aims to provide the best medical treatment to every patient.
//             </p>
//             <p className="text-gray-600 mb-6 text-justify">
//               He is also the founder of Biopathy treatment practices and medicines which has been
//               originated from Electropathy and Ayurvedic natural combinations. Through his research
//               and invention he cured many chronic diseases and registered his name as World Record
//               Holder. He has been awarded several times for his phenomenal work like National Health
//               Care Award, Global Health Care World and many more.
//             </p>
//             <Link href="/drbio" className="ayur-btn">
//               Know More
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }