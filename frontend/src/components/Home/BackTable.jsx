import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
const BackTable = ({destination='/home'}) => {
  return (
    <div className='flex'>
      <Link to={destination} className='btn  bg-sky-800 text-white px4 py-1 rounded-lg w-fit' style={{background:"linear-gradient(to right,rgb(224, 195, 158), moccasin)"}}><FaArrowAltCircleLeft/></Link>
    </div>
  )
}

export default BackTable
