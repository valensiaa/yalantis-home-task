import { Link, useLocation } from 'react-router-dom'
import style from './Logo.module.css'

const Logo = () => {
   const location = useLocation();
  const { pathname } = location;
   return <div className={`${style.logoBlock} ${pathname !== "/cart" ? '' : style.logoBlockCenter}`}>
      <Link to='/'>
      <div>
         <span>LOGO</span>
      </div>
      </Link>
      
   </div>
}
export default Logo