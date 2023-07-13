const PictureCard = ({pic}) => {
    return <div className="h-[50%] block">
        <img src={pic} className="h-full rounded-md shadow-gray-900 shadow-md object-cover object-top" />
        </div>
}

export default PictureCard