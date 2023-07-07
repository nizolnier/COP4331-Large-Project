const MenuItem = ({image, title}) => {
    return <div className={`flex items-center p-2 ${title === "Logout" ? 'absolute bottom-0 pb-[20em]' : ''}`}>
         <img src={image} />
        <h2 className={`text-white ${title !== "Logout" ? 'text-opacity-50' : ''} ml-3`}>{title}</h2>
    </div>
}

export default MenuItem