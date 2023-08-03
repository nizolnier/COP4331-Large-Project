import lkin from '../assets/linkedin.svg'
import gh from '../assets/github.svg'

const PersonCard = ({pic, name, favcartoon, linkedin, github}) => {
    return <div className="m-4 w-44 h-56 px-4 pt-4 pb-4 bg-zinc-300 bg-opacity-10 rounded-lg shadow border border-white border-opacity-50 flex-col justify-start items-center">
        <div>
            <img className="m-auto w-20 h-20 bg-stone-300 rounded-full" src={pic} />
        </div>
        <div className="cursor-default w-[10%%] flex justify-center flex-col items-center">
            <h1 className="text-white text-base font-bold">{name}</h1>
            <p className="text-center text-white text-[10px] font-medium">Favorite Cartoon: <br></br>{favcartoon}</p>
        </div>
        <div className="flex justify-between px-5 pt-4">
            <a target="_blank" href={linkedin}><img src={lkin} /></a>
            <a target="_blank" href={github}><img src={gh} /></a>
        </div>

    </div>
}

export default PersonCard