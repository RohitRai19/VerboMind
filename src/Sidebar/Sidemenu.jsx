import React, { useContext, useState } from 'react'
import './sidemenu.css'
import { ClearChat } from '../DataContext'

function Sidemenu() {
    const BtnName=useContext(ClearChat)
  return (
<>

<div>User Input</div>
<div>Settings</div>
<button >{BtnName}</button>
</>
  
  )}


export default Sidemenu