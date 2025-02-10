import Navbar from '@/components/layout/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='mx-auto max-w-screen md:max-w-6xl'>
        <Navbar />
        {children}
      </div>
    </>
  )
}
