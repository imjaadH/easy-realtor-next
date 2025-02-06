import Navbar from '@/components/layout/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='mx-auto max-w-screen'>
        <Navbar />
        {children}
      </div>
    </>
  )
}
