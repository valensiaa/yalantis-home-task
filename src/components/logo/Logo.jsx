import { Link } from 'react-router-dom'
import style from './Logo.module.css'

const Logo = () => {
   return <div className={style.logoBlock}>
      <Link to='/'>
      <div>
         <span>LOGO</span>
      </div>
      </Link>
      
   </div>
}
export default Logo