import { useEffect, useState } from "react"
import Navbar from "./Navbar"

export default function Header() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        // Agregar evento de escucha del tamaño de la ventana
        window.addEventListener('resize', handleResize)
        // Limpieza del evento cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        // Ejecutar el efecto solo una vez al montar el componente
    }, [])

    return (
        <header className="flex bg-[#ffdc92] p-10 w-full shadow-md shadow-gray-500">
            {width > 480 && <img src="https://cdn-icons-png.flaticon.com/512/6681/6681441.png" alt="icon" title="ToDo List" className="w-[60px]" />}
            <Navbar />
        </header>
    )
}