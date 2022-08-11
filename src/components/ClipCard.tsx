import { useState } from "react";
import { UData } from "../model/UData.model";
import { copyTextToClipBoard, pasteTextFromClipBoard, readContentFromClipBoard } from "../services/clipboard";
import { uTimeNow } from "../util/udate";

let clips = [
    {
        id: "clip-1",
        data: "First Clip",
        time: uTimeNow()
    },
    {
        id: "clip-2",
        data: "2nd Clip",
        time: uTimeNow()
    },
    {
        id: "clip-3",
        data: "Third Clip",
        time: uTimeNow()
    }
]

export function ClipCard(data: UData) {
    function handleCopy(content: string) {
        copyTextToClipBoard(content)
    }
    return (
        <div className="container p-2 m-2 bg-gray-200 overflow-x-hidden font-sans">
            <div className="">
                <div  className = "text-xs">
                     <button className = "float-right" onClick={() => handleCopy(data.data)}> Copy</button>
                </div>
            </div>
            <div className="font-mono overflow-ellipsis">
                {data.data}
            </div>
            <div className="text-xs mt-5 italic">
                <p>{data.time}</p>
            </div>
        </div>
    );
    
}

export default function ClipList() {
    const [dynamicClips, setClips] = useState(clips)

    async function handlePaste() {
    //    let str = await pasteTextFromClipBoard()
        var content = window.uspace.clipboard.readFromClipboard()
        console.log("NODEJs Clipboard:", content)
       let str = content.textContent
       setClips((list) => {
        // console.log(str)
        list.push({
            id: `clip - ${list.length}`,
            data: str.toString(),
            time: uTimeNow()
        })
        return [...list].reverse()
       });

    //    await readContentFromClipBoard()

    }

    return <>
        <button onClick={async () => await handlePaste()}>Paste content</button>
        {dynamicClips.map((c) => <div key={c.id}> {ClipCard(c)} </div>)}
    </>
}

export function PrintVersions() {
    // window.versions.socketConnect(
    //     (msg: string) => console.log("Socket:", msg)
    // )
    console.log(window.uspace.versions.versionByName("Heelo", (msg: string) => {
        console.log("Socket:", msg)
    }));

    return (
        <>
            <h3 className="bg-brown-500 text-white-400">
                Clip Card
            </h3>
            <p>
                Node Version: {window.uspace.versions.node()}
            </p>

            <p>
                Chrome Version: {window.uspace.versions.chrome()}
            </p>

            <p>
                Electron Version: {window.uspace.versions.electron()}
            </p>
        </>
    );
}