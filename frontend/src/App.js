import { useState } from "react"
import axios from "axios"

function App() {
  const [ shortUrl, setShortUrl] = useState("")
  const [ linkInput, setLinkInput] = useState("");
  
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-10">
      <form className=" flex flex-col items-center gap-4 border border-black rounded w-[300px] md:w-[600px] px-4 py-10 md:px-8 " onSubmit={async (e)=> {
        e.preventDefault()
        await axios.post("http://localhost:5000/", {url: linkInput})
        .then((res)=> setShortUrl(`localhost:5000/${res.data.createdUrl.shortUrl}`))
        .catch((err)=> console.log(err))
      }} >
        <input type="text" onChange={(e)=> setLinkInput(e.target.value)} placeholder="link" className=" px-4 border border-zinc-700 h-14 w-full rounded" />
        <button className=" h-11 px-6 rounded-md shadow-lg text-white bg-indigo-800" type="submit">
          Shorten URL
        </button>
      </form>

      {
        shortUrl && <div className=" flex flex-col items-center gap-4 border border-black rounded w-[300px] md:w-[600px] px-4 py-10 md:px-8 ">
          { shortUrl }
        </div>
      }
    </div>
  );
}

export default App;