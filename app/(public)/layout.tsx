import "./website.css"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
      <link rel="stylesheet" href="/css/select2.min.css" />
      <link rel="stylesheet" href="/css/flatpickr.min.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/responsive.css" />
      {children}
    </>
  )
}