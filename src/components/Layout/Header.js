// Holds header code // Navbar with cart option
import React from 'react'
import mealsImage from '../../assets/spencer-davis-5UeN8VrCxvs-unsplash.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>Gungun-Meals</h1>
            <HeaderCartButton onShowCart={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}> {/*it has - inside so we write like this*/}
            <img src={mealsImage} alt="Table of Delicious food" />
        </div>
    </React.Fragment>
  )
}

export default Header