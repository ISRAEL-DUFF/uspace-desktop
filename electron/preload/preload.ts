import { contextBridge } from "electron";
import socketPreload from "./socket.preload"
import uClipboard from "./clipboard.preload"

contextBridge.exposeInMainWorld("uspace", {
    versions: {
        node: () => {
            return process.versions.node
        },
    
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    
        versionByName: (name: "node" | "chrome" | "electron", cb: any) => {
            switch(name) {
                case "node":
                    return process.versions.node
                case "chrome":
                    return process.versions.chrome
                default:
                    return process.versions.electron
            }
        }
    },

    socket: socketPreload,

    clipboard: uClipboard,
})