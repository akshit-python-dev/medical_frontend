import Header from "@/components/website/header"
import Footer from "@/components/website/footer"
import Breadcrumb from "@/components/website/breadcrumb"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Jalandhar, Punjab",
    rating: 5,
    text: "My son was diagnosed with ADHD and we were hopeless. After consulting Dr. Jaswinder Singh and starting the treatment, we saw remarkable improvement within 3 months. His focus and behavior have improved significantly. Forever grateful to E-Bio Cares!",
  },
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "I traveled from Delhi to Jalandhar specifically for Dr. Singh's treatment. My daughter's speech disorder has shown tremendous improvement. The natural approach without any side effects is what makes this treatment special.",
  },
  {
    name: "Mohammad Asif",
    location: "Ludhiana, Punjab",
    rating: 5,
    text: "After trying many treatments for my diabetes with no success, I found E-Bio Cares. The electropathy treatment has helped me manage my blood sugar naturally. Dr. Singh's diagnostic method through pulse, eyes, and nails is truly remarkable.",
  },
  {
    name: "Gurpreet Kaur",
    location: "Amritsar, Punjab",
    rating: 5,
    text: "Our child was diagnosed with autism and we lost all hope. Dr. Jaswinder Singh gave us new hope. After 6 months of treatment, our child has started responding to us and showing signs of improvement. Highly recommend E-Bio Cares to all parents.",
  },
  {
    name: "Suresh Verma",
    location: "Chandigarh, India",
    rating: 5,
    text: "I was suffering from lung disease for years. The biopathy treatment at E-Bio Cares has significantly improved my breathing and overall health. The plant-based medicines are gentle yet effective.",
  },
  {
    name: "Anita Devi",
    location: "Jalandhar, Punjab",
    rating: 5,
    text: "Dr. Singh's approach to treatment is unique. He diagnosed my condition just by checking my pulse, nails, and tongue. The treatment for my chronic condition has been life-changing. No surgery, no side effects!",
  },
]

export default function TestimonialPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="TESTIMONIALS" currentPage="Testimonials" />

        <section className="py-16 md:py-24 bg-[#f6f1ed]">
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h5 className="text-[#CD8973] font-semibold mb-2">What Our Patients Say</h5>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                Patient Testimonials
              </h3>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Read what our patients have to say about their experience with E-Bio Cares and our
                electropathy/biopathy treatments.
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#CD8973] text-[#CD8973]" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>

                  {/* Author */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
