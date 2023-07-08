import { useState } from 'react'


const MenuItem = ({rimage, image, title, goto}) => {

    const [hovering, setHovering] = useState(false)

    return <div onClick={goto} className={`hover:text-[#1F1D36] text-white hover:bg-red-300 hover:rounded-lg cursor-pointer flex items-center p-2 ${title === "Logout" ? 'absolute bottom-0 mb-[20em]' : 'text-opacity-50'}`}
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)} >
         <img  src={hovering? rimage : image} />
        <h2 className="ml-3">{title}</h2>
    </div>
}

export default MenuItem