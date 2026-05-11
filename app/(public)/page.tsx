import Header from "@/components/website/header"
import Footer from "@/components/website/footer"
import HeroSection from "@/components/website/home/hero-section"
import DrBioSection from "@/components/website/home/drbio-section"
import HistorySection from "@/components/website/home/history-section"
import AchievementsSection from "@/components/website/home/achievements-section"
import WhyChooseSection from "@/components/website/home/why-choose-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
         {/* <DrBioSection /> */}
        {/* <HistorySection /> */}
       {/* <AchievementsSection /> */}
        {/* <WhyChooseSection /> */}
      </main>
      <Footer />
    </>
  )
}
