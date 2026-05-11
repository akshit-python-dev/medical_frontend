import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

const features = [
  {
    icon: "/images/why-icon1.png",
    title: "100% Organic",
    description: "Pure, Natural, and Free from chemicals-just as nature intended!",
  },
  {
    icon: "/images/why-icon2.png",
    title: "Best Quality",
    description: "Uncompromising excellence in every product!",
  },
  {
    icon: "/images/why-icon3.png",
    title: "Hygienic Product",
    description: "Ensuring Purity and Cleanliness in every use!",
  },
  {
    icon: "/images/why-icon4.png",
    title: "Health Care",
    description: "Caring for your Health with pure excellence!",
  },
]

const benefits = [
  "Targeted Healing: Yes.",
  "Invasive: No.",
  "Gentle and Natural: Yes.",
  "Side Effects: No.",
  "Suitable for Age Group: All.",
  "Painful: No.",
]

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h5 className="text-[#CD8973] font-semibold mb-2">Best For You</h5>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose Electropathy/Biopathy?
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature Boxes */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#f6f1ed] flex items-center justify-center flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits and CTA */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Solve health issues with Nature&apos;s Blessings.
            </h3>
            <p className="text-gray-600 mb-4 text-justify">
              At E-Bio-Cares, we believe in using the power of plants to help your body heal itself.
              Our approach is simple - we want to balance your body, getting rid of any issues by
              making sure your blood and lymphatic systems work together smoothly.
            </p>
            <p className="text-gray-800 font-medium mb-6">
              We don&apos;t just treat symptoms; we tackle the root cause to ensure a complete and lasting
              recovery.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2d5a27] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link href="/treatments" className="ayur-btn">
              Read More
            </Link>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/V-kD6A2nY48?rel=0&modestbranding=1"
                title="E-Bio Cares Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-40 opacity-20 pointer-events-none">
        <Image
          src="/images/bg-shape4.png"
          alt=""
          width={160}
          height={200}
          className="w-full h-auto"
        />
      </div>
      <div className="absolute top-0 right-0 w-40 opacity-20 pointer-events-none">
        <Image
          src="/images/bg-leaf4.png"
          alt=""
          width={160}
          height={200}
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}
