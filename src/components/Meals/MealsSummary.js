// js file for meals summary section
import React from 'react'
import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
        <h2>Delicious Food, Made By Chef Gungun</h2>
        <p>
            Choose your favourite meal from our broad selection of
            available meals and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
            All out meals are cooked with high-quality ingredients by out top Chef Gungun,
             just-in-time.
        </p>
    </section>
  )
}

export default MealsSummary