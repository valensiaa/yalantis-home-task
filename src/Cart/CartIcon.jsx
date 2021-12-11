import { NavLink } from 'react-router-dom'
import style from './Cart.module.css'

const CartIcon = () => {
    return (
        <div className={style.cartIconBlock}>
            <NavLink to={'/cart'}>
                <div>Summary</div>
                <span> 2555.12</span>
            </NavLink>
            
        </div>
    )
}

export default CartIcon