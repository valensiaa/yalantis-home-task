import loaderImg from '../../assets/loader.png'
import style from './Loader.module.css'

const Loader = () => {
   return <div className={style.loaderBlock}>
      <div>
         <img src={loaderImg} alt="loader"/>
      </div>
   </div>
}
export default Loader