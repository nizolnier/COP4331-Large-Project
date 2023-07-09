
const Button = ({type, title, onc}) => {
    return <>
     {
        type === "submit" ? <button type="submit" className="w-[95px] h-[35px] bg-red-300 rounded-[30px] text-center text-gray-800 text-[13px] font-bold tracking-wide">{title}</button> :
        <button onClick={onc} className="w-[127px] h-[45px] bg-red-300 rounded-2xl text-center text-gray-800 text-[13px] font-bold tracking-wide">{title}</button>
    }
    </>
}

export default Button
