import Image from "next/image"

const achievements = [
  {
    icon: "/images/achieve-icon3.png",
    value: "100%",
    label: "Success Rate",
  },
  {
    icon: "/images/achieve-icon2.png",
    value: "512,128",
    label: "Patients Treated",
  },
  {
    icon: "/images/achieve-icon4.png",
    value: "100%",
    label: "Product Purity",
  },
  {
    icon: "/images/achieve-icon1.png",
    value: "0%",
    label: "Side Effects",
  },
]

export default function AchievementsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f6f1ed]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Heading */}
          <div>
            <h5 className="text-[#CD8973] font-semibold mb-2">E-Bio Cares</h5>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
              Benefit From Choosing The Best
            </h3>
          </div>

          {/* Achievement Boxes */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#CD8973] mb-2">
                    {item.value}
                  </h2>
                  <p className="text-gray-800 font-medium text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
