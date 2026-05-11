"use client"

import { useState } from "react"
import Image from "next/image"
import Header from "@/components/website/header"
import Footer from "@/components/website/footer"
import Breadcrumb from "@/components/website/breadcrumb"

export default function ADHDPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    date: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your appointment request. We will contact you soon!")
  }

  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="ADHD" currentPage="ADHD" />

        {/* Main Section */}
        <section className="py-16 md:py-24 bg-[#f6f1ed] relative overflow-hidden">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Appointment Form */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-[#800000] text-center mb-8">
                  Book An Appointment
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="First Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973]"
                      required
                    />
                    <input
                      type="text"
                      name="contact"
                      placeholder="Contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973]"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email (Optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973]"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973]"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Describe an Issue you are Facing"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-800 rounded-md focus:outline-none focus:border-[#CD8973]"
                    required
                  />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="ayur-btn bg-[#800000] hover:bg-[#600000]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#800000] mb-6">
                  Best Doctor for ADHD in Jalandhar
                </h3>
                <p className="text-gray-600 text-justify mb-4">
                  ADHD also known as Attention Deficit Hyperactivity Disorder. It is most common type
                  of mental disorder which affects the brain of children. Nowadays, ADHD symptoms can
                  be commonly found in many children and adults which is possibly discussed below. But
                  it is really challenging to find the best ADHD doctor in Punjab. The requirements to
                  find best ADHD doctor is that he/she should be experienced as it requires special
                  skills to handle those patients.
                </p>
                <p className="text-gray-600 text-justify mb-4">
                  <span className="text-[#2d5a27] font-semibold">
                    Dr. Jaswinder Singh (B.E.M.S., M.D)
                  </span>{" "}
                  is considered as one of the best ADHD doctor in Punjab. Through his 30 years of
                  practice and research in Electropathy and natural remedies, he is an expert in
                  treating thousands of patients globally. As a founder of E-Bio cares and a World
                  Record Holder, he also received many national healthcare awards. He also treat
                  patients with brain disorders which includes Autism, ADHD, Speech Disorder and
                  Cerebral Palsy (CP). Also with his extensive research and successful practice he
                  established <span className="text-red-600 font-semibold">&quot;Biopathy&quot;</span>, which is
                  a medical science combining Electropathy and natural remedies derived from flowers
                  and plants. These all above factors lead him to present as best ADHD doctor in
                  Punjab.
                </p>
                <p className="text-gray-600 text-justify">
                  If you are having concerns about ADHD disorder or seeking for best ADHD doctor in
                  Punjab. Dr. Jaswinder Singh is best healthcare professional in this field. He
                  figures out the best way of diagnosis by checking eyes, nails, tongue and nerves. So
                  with this method through his 30 years of dedicated services and progress in
                  neurology he cured thousands of brain disorder patients. That is why he is
                  considered as the best ADHD doctor in Punjab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADHD Symptoms Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-6">ADHD Symptoms</h2>
                <p className="text-gray-600 text-justify mb-4">
                  It requires special skills to observe ADHD symptoms and Dr. Jaswinder Singh is
                  expert in finding those symptoms through his traditional diagnose method makes him
                  best ADHD doctor in Punjab. ADHD symptoms can be categorized into various types such
                  as hyperactivity, aggressiveness, not interacting with other people and many more.
                  In this condition brain works differently as compared to normal people. Children are
                  facing sleeping problems, they do not have proper sleeping routine.
                </p>
                <p className="text-gray-600 text-justify">
                  They do not listen to commands of their parents and can be seen talking to
                  themselves. Other ADHD symptoms are jumping, sensory nerves, motor nerves, chewing
                  problem and many more. So if you have seen these kind of symptoms in your kids,
                  family or any relative kindly consult Dr. Jaswinder Singh as he is best ADHD doctor
                  in Punjab.
                </p>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/adhd.jpg"
                    alt="ADHD Treatment"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADHD Disorder Section */}
        <section className="py-16 md:py-24 bg-[#f6f1ed]">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-6">ADHD Disorder</h2>
            <p className="text-gray-600 text-justify mb-4">
              Dr. Jaswinder Singh also cured thousands of patients having ADHD disorder who have
              difficulty in focusing and struggle with emotional regulation that is why he is
              recognized as the best ADHD doctor in Punjab. Individuals with ADHD have lack of
              concentration, restlessness and they can be seen standing still at one place. They
              immediately get frustrated by loud noises, in some patients depression and anxiety
              disorder are primarily observed. They feel uneasy, have difficulty in working, going to
              school and are not involved in social interactions. ADHD disorder patient involves
              pattern of aggressiveness, feeling of sadness and hopelessness.
            </p>
            <p className="text-gray-600 text-justify">
              If these type of disorders are seen in your family, relatives or any of your close
              friends you can consult with Dr. Jaswinder Singh at E-Bio Cares as he is best ADHD
              doctor in Punjab.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
