import Image from "next/image";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import Breadcrumb from "@/components/website/breadcrumb";

const treatments = [
  {
    title: "Autism",
    image: "/service-image/autism.jpg",
    description: "Autism: Holistic Treatment to Enhance Social Skills and Health.",
  },
  {
    title: "Cerebral Palsy",
    image: "/service-image/cerebral-palsy.jpg",
    description: "Cerebral Palsy & Pregnancy-Related Complications.",
  },
  {
    title: "ADHD",
    image: "/service-image/adhd.jpg",
    description:
      "ADHD is a mental condition in which a person has problems with brain development that impact brain activity.",
    href: "/adhd",
  },
  {
    title: "Cancer Treatment",
    image: "/service-image/cancer-treatment.jpg",
    description:
      "Cancer, A Natural Approach to Restore Balance and Harmony in the Body. We provide guaranteed treatment with our electropathy/biopathy medicines where allopathy is expensive with no guarantee at all.",
  },
  {
    title: "Paralysis",
    image: "/service-image/Paralysis.jpg",
    description:
      "Paralysis means you can't move one or more parts of your body. This happens because the nervous system, which includes your brain, nerves, and muscles, isn't working properly.",
  },
  {
    title: "Diabetes",
    image: "/service-image/diabetics.jpg",
    description:
      "Diabetes is a condition that affects millions of people in India and across the world. It happens when your body struggles to manage blood sugar levels properly.",
  },
  {
    title: "Lung Diseases",
    image: "/service-image/lung-disease.jpg",
    description:
      "Lung diseases affect millions of people, causing symptoms like breathlessness, coughing, and fatigue.",
  },
];

export default function TreatmentsPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="TREATMENTS" currentPage="TREATMENTS" />

        <div className="ayur-bgcover ayur-blog-sec ayur-blogsin-page pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-heading-wrap">
                  <h5>TREATMENTS</h5>
                  <h3>OUR TREATMENTS</h3>
                </div>
              </div>
            </div>
            <div className="row">
              {treatments.map((treatment, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="ayur-blog-box">
                    <div className="ayur-blog-img">
                      <Image
                        src={treatment.image}
                        alt={treatment.title}
                        width={356}
                        height={195}
                        className="img-fluid w-100"
                        style={{ height: "195px", width: "356px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="ayur-blog-text">
                      <div className="ayur-blog-date"></div>
                      <h3>
                        <a href={treatment.href || "#"}>{treatment.title}</a>
                      </h3>
                      <p style={{ color: "#000" }}>{treatment.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ayur-bgshape ayur-blog-bgshape">
            <img src="/images/bg-shape6.png" alt="img" />
            <img src="/images/bg-leaf6.png" alt="img" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
// import Image from "next/image"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"

// const treatments = [
//   {
//     title: "Autism",
//     image: "/service-image/autism.jpg",
//     description: "Autism: Holistic Treatment to Enhance Social Skills and Health.",
//   },
//   {
//     title: "Cerebral Palsy",
//     image: "/assets/service-image/cerebral-palsy.jpg",
//     description: "Cerebral Palsy & Pregnancy-Related Complications.",
//   },
//   {
//     title: "ADHD",
//     image: "/assets/service-image/adhd.jpg",
//     description: "ADHD is a mental condition in which a person has problems with brain development that impact brain activity.",
//     href: "/adhd",
//   },
//   {
//     title: "Cancer Treatment",
//     image: "/assets/service-image/cancer-treatment.jpg",
//     description: "Cancer, A Natural Approach to Restore Balance and Harmony in the Body. We provide guaranteed treatment with our electropathy/biopathy medicines where allopathy is expensive with no guarantee at all.",
//   },
//   {
//     title: "Paralysis",
//     image: "/assets/service-image/Paralysis.jpg",
//     description: "Paralysis means you can't move one or more parts of your body. This happens because the nervous system, which includes your brain, nerves, and muscles, isn't working properly.",
//   },
//   {
//     title: "Diabetes",
//     image: "/assets/service-image/diabetics.jpg",
//     description: "Diabetes is a condition that affects millions of people in India and across the world. It happens when your body struggles to manage blood sugar levels properly.",
//   },
//   {
//     title: "Lung Diseases",
//     image: "/assets/service-image/lung-disease.jpg",
//     description: "Lung diseases affect millions of people, causing symptoms like breathlessness, coughing, and fatigue.",
//   },
// ]

// export default function TreatmentsPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Breadcrumb title="TREATMENTS" currentPage="Treatments" />

//         <section className="py-16 md:py-24 bg-[#f6f1ed] relative overflow-hidden">
//           <div className="container-custom">
//             {/* Section Header */}
//             <div className="text-center mb-12">
//               <h5 className="text-[#CD8973] font-semibold mb-2">TREATMENTS</h5>
//               <h3 className="text-3xl md:text-4xl font-bold text-gray-800">OUR TREATMENTS</h3>
//             </div>

//             {/* Treatment Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {treatments.map((treatment, index) => (
//                 <div key={index} className="treatment-card group">
//                   <div className="relative h-48 overflow-hidden">
//                     <Image
//                       src={treatment.image}
//                       alt={treatment.title}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                       {treatment.href ? (
//                         <a href={treatment.href} className="hover:text-[#CD8973] transition-colors">
//                           {treatment.title}
//                         </a>
//                       ) : (
//                         treatment.title
//                       )}
//                     </h3>
//                     <p className="text-gray-600 text-sm">{treatment.description}</p>
//                   </div>
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
