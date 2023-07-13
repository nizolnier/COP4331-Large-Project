const PictureCard = ({pic}) => {
    return <div className="h-[50%] block">
        <img src={pic} className="h-full rounded-md hover:shadow-lg hover:slay-sm object-cover object-top" />
        </div>
}

export default PictureCard