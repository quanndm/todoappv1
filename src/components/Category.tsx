import React from 'react'

const Category = () => {
  return (
    <div className='category'>
        <h2 className='title'>Categories</h2>
        <div className="category-list">
            <button className='btn-urgen'>Urgen</button><br />
            <button className='btn-delegate'>Delegate</button><br />
            <button className='btn-schedule'>Schedule</button><br />
            <button className='btn-lately'>Lately</button>
        </div>
    </div>
  )
}

export default Category