import React from 'react'
import { Link } from 'react-router-dom';


function ClientNavBar() {
  return (
    <div>
      <Link>Home</Link>
      <Link>Order</Link>
      <Link>My Order</Link>
      <Link>Profile</Link>
    </div>
  )
}

export default ClientNavBar
