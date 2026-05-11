import Link from "next/link"

interface BreadcrumbProps {
  title: string
  currentPage: string
}

export default function Breadcrumb({ title, currentPage }: BreadcrumbProps) {
  return (
    <section className="breadcrumb-bg py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <div className="container-custom relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Link href="/" className="hover:text-[#CD8973] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#CD8973]">{currentPage}</span>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 -translate-y-1/4" />
    </section>
  )
}
