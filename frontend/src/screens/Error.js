import error from '../assets/error.jpeg'

const Error = () => {
    return <div className="flex flex-col items-center justify-center text-white w-screen h-screen bg-[#1F1D36]">
        <h1 className="text-2xl pb-6 font-bold">
        Oh no, there's nothing here!
        </h1>
        <p className="w-[90%] lg:w-[100%] text-center pb-6 text-base font-normal">
        Whatever you were looking for doesn't currently exist at this address. Unless you were looking for this error page, in which case:
        </p>
        <img className="w-2/3 lg:w-1/2" src={error} />
        <h2 className="text-base font-bold pt-6">Congrats!! You found it!</h2>
        </div>
}

export default Error