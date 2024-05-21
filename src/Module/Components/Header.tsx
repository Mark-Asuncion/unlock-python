import pythonLogo from '../../Assets/python-logo.png';

function bet() {
    window.open("https://1-xbet.ph/en", "_blank");
}

function getName() {
    const name = sessionStorage.getItem("firstname") + ' ' +
                 sessionStorage.getItem("lastname"); return name;
}

export default function Header() {
    return (
        <div className='w-[100%] bg-accent text-white
            flex flex-row p-3'>

            <div className='bg-white rounded-full m-1 p-2' onClick={() => bet() }>
                <img src={pythonLogo} alt="logo" className='w-auto h-auto'/>
            </div>
            <div className='my-auto ml-auto pr-4 text-lg font-bold'> <span>{ getName() }</span> </div>
        </div>
    )
}
