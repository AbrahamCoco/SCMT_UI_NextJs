import Navbar from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/styles.css'

export const metadata = {
  title: 'SCMT - Home',
}

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
