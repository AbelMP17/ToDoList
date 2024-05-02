import Navbar from "./Navbar"

export default function Header(){
    return (
        <header className="flex bg-[#ffdc92] p-10 w-full shadow-md shadow-gray-500">
            <img src="https://e7.pngegg.com/pngimages/553/526/png-clipart-notepad-computer-icons-others-angle-text-thumbnail.png" alt="icon" title="ToDo List" className="w-[60px]" />
            <Navbar />
        </header>
    )
}