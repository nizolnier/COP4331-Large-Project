import side from '../assets/side.svg'

const Header = ({username}) => {
    return <div className="flex justify-between pt-8 p-6">
        <img src={side}/>  
        <img className="w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
    </div>
}

export default Header