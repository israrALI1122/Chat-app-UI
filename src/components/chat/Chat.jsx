import React, { useState } from 'react'
import "./Chat.css"
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { IconContext } from "react-icons";
import abc from './endgame.jpg'


const Chat = () => {

  const [senddata, setSendData] = useState("");
  const [clickitem, setClickItem] = useState([])
  const [popup, setPopUp] = useState(false)

  const change = (e) => {
    setSendData(e.target.value)

  }
  const click = () => {
    console.log("clicked");
    if (senddata.trim() !== "") {
      setClickItem((olditem) => {
        return [...olditem, senddata]
      })
      setSendData('')

    }
  }

  const handleOnClick = () => {
    setPopUp(!popup)


  }
  return (
    <div className="container">
      <div className='head'>
        <div className="info ">
            <img src={abc} alt="" className='image' />
          <div className="name">
            <h3>ISRAR 007</h3>
            <p>online</p>
          </div>
          <div className="status"> </div>
        </div>
        <div>
          <IconContext.Provider value={{ className: 'phone' }}>
            <BsFillTelephoneFill />
          </IconContext.Provider>
        </div>
        <div >
          <IconContext.Provider value={{ className: 'alert' }}>
            <RiErrorWarningFill />
          </IconContext.Provider>
        </div>
      </div>
      <div className='container1'>
         <img src={abc} alt="" className='image-info' />
        <div className="information">
          <div className='written'>
            <ul>
              <li>I want a star wars themed wedding</li>
              <li>waiter should have light sabers with them</li>
              <li>extra Decoration</li>
              <li>extra lightning klzdjsdkdjljkjdlkjdkdjdksjdksdjsdksdjdsdksjdsdksdjsjk </li>
            </ul>
          </div>
        </div>
        <img src={abc} alt="" className='image-info' />

        <div className="information">
          <div className='written'>
            <ul>
              <li>I want a star wars themed wedding</li>
              <li>waiter should have light sabers with them</li>
              <li>extra Decoration</li>
              <li>extra lightning klzdjsdkdjljkjdlkjdkdjdksjdksdjsdksdjdsdksjdsdksdjsjk </li>
            </ul>
          </div>
        </div>
        <img src={abc} alt="" className='image-info' />

        <div className="information">
          <div className='written'>
            <ul>
              <li>I want a star wars themed wedding</li>
              <li>waiter should have light sabers with them</li>
              <li>extra Decoration</li>
              <li>extra lightning klzdjsdkdjljkjdlkjdkdjdksjdksdjsdksdjdsdksjdsdksdjsjk </li>
            </ul>
          </div>




          
        </div>
        {

          clickitem.map((curEl) => {
            return (
              <>
               
                <img src={abc} alt="" className='second-img' />

                <div className="information1">
                  <div className='written'>

                    <p>{curEl}</p>



                  </div>
                </div>
              </>

            )
          })
        }




{
        popup ?
          <div className="uplodingitems" >
            <div className="uploadingicons">

              <IconContext.Provider value={{ className: 'icons' }}>
                <BsFillFileEarmarkTextFill />
              </IconContext.Provider>

              <IconContext.Provider value={{ className: 'icons' }}>
                <MdPhotoSizeSelectActual />
              </IconContext.Provider>

              <IconContext.Provider value={{ className: 'icons' }}>
                <ImAttachment />
              </IconContext.Provider>
            </div>
          </div>

          : ""}









      </div>

    
      
<div className='inputfil'>
        <IconContext.Provider value={{ className: "uploadicon" }}>
          <AiFillPlusCircle onClick={handleOnClick} />
        </IconContext.Provider>

        <input type="text" value={senddata} required onChange={change} className="input" />
        <IconContext.Provider value={{ className: "sendicon" }}>
          <IoMdSend onClick={click} />
        </IconContext.Provider>
      </div>

     


    </div>
  )
}

export default Chat