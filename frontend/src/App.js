import { useState } from "react";
import axios from "axios";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [ expire, setExpire] = useState(30)

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-10 bg-sky-200">
      <form
        className=" flex flex-col items-center gap-4 border border-black rounded w-[300px] md:w-[600px] px-4 py-10 md:px-8 bg-white "
        onSubmit={async (e) => {
          e.preventDefault();
          await axios
            .post(process.env.REACT_APP_BACKEND, { url: linkInput, expire: expire })
            .then((res) =>
              setShortUrl(`localhost:8000/${res.data.createdUrl.shortUrl}`)
            )
            .catch((err) => console.log(err));
        }}
      >

        {/* TEXT BOX */}
        <input
          type="text"
          onChange={(e) => setLinkInput(e.target.value)}
          placeholder="link"
          className=" px-4 border border-zinc-700 h-14 w-full rounded"
        />

        {/* EXPIRE DATE RADIO */}
        <div className=" flex gap-2">

          <div className=" border border-black relative w-12 h-8 rounded overflow-hidden">
            <input type="radio" name="expire" id="one" className="radio appearance-none" />
            <label className=" w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" htmlFor="one" onClick={()=> setExpire(1)}>
              1d
            </label>
          </div>
          <div className=" border border-black relative w-12 h-8 rounded overflow-hidden">
            <input type="radio" name="expire" id="seven" className="radio appearance-none" />
            <label className=" w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" htmlFor="seven" onClick={()=> setExpire(7)}>
              7d
            </label>
          </div>
          <div className=" border border-black relative w-12 h-8 rounded overflow-hidden">
            <input type="radio" name="expire" id="thirty" defaultChecked className="radio appearance-none" />
            <label className=" w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" htmlFor="thirty" onClick={()=> setExpire(30)}>
              30d
            </label>
          </div>
          <div className=" border border-black relative w-12 h-8 rounded overflow-hidden">
            <input type="radio" name="expire" id="hundred" className="radio appearance-none" />
            <label className=" w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" htmlFor="hundred" onClick={()=> setExpire(100)}>
              100d
            </label>
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <button
          className=" h-11 px-6 rounded-md shadow-lg text-white bg-indigo-800"
          type="submit"
        >
          Shorten URL
        </button>
      </form>

      {/* SHORT LINK COMPONENT */}
      {shortUrl && (
        <div className=" flex flex-col items-center gap-4 border border-black rounded w-[300px] md:w-[600px] px-4 py-10 md:px-8 bg-white ">
          {shortUrl}
        </div>
      )}
    </div>
  );
}

export default App;
