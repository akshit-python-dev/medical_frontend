import Image from "next/image"

export default function HistorySection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about.jpg"
                alt="Electropathy History"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Electropathy/Biopathy History
            </h3>
            <p className="text-gray-600 mb-4 text-justify">
              Electropathy - A Natural healing system, was founded by Count Mattei and later advanced
              by Theodore Krauss. After its revival post - World War I, the unique spagyric method
              emerged in Germany, blending nature with science to create effective remedies for a
              variety of illnesses.
            </p>
            <p className="text-gray-600 mb-4 text-justify">
              This holistic approach is suitable for everyone, regardless of age or health condition.
              Whether you&apos;re managing chronic issues like arthritis, migraine, or ulcers, or seeking
              relief from emotional challenges like depression, electropathy&apos;s natural remedies are
              designed to support your healing journey and enhance your overall well-being.
            </p>
            <p className="text-gray-600 text-justify">
              <span className="font-bold text-gray-800">
                <span className="text-[#8B4513] font-bold">Dr. Jaswinder Singh</span> invented
                medicines which is the combination of Electropathy and Ayurvedic treatments and cured
                thousands of patients of Brain Disorder includes Autism, ADHD, Speech Disorder and
                Cerebral Palsy and founded a new branch of medical science known as{" "}
                <span className="text-[#8B4513] font-bold">BIOPATHY.</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-40 opacity-20 pointer-events-none">
        <Image
          src="/images/bg-shape2.png"
          alt=""
          width={160}
          height={200}
          className="w-full h-auto"
        />
      </div>
      <div className="absolute top-0 right-0 w-40 opacity-20 pointer-events-none">
        <Image
          src="/images/bg-leaf2.png"
          alt=""
          width={160}
          height={200}
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}
