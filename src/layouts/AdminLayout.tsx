import { Outlet } from 'react-router-dom'
import AdminNavBar from '../components/admin/general/NavBar'

export default function AdminLayout() {
  return (
    <div>
        <AdminNavBar></AdminNavBar>
        <main className='pt-4 px-3 tablet:px-7 desktop:px-[100px]'>
            <Outlet/> 
        </main>
    </div>
  );
}
