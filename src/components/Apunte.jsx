export default function Apunte( {name, apunte}){
    return (<div>
        <div className="flex flex-col bg-[#fdd47c] p-10 rounded-tr-xl rounded-b-xl">
          <input type="text" value={name} />
          <textarea value={apunte} />

        </div>
    </div>)
}