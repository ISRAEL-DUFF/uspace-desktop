import { clipboard } from "electron";


export default {
    readFromClipboard: () => {
        // TODO: parse the content properly
        // use the resources: https://github.com/electron/electron/issues/9035
        let content = null
        let singleFile = null
        let multiFile = null
        if(process.platform === "darwin") {
            let singleFile = clipboard.read('public.file-url')
            let multiFile = clipboard.read('NSFilenamesPboardType')
            let c2 = clipboard.readText()
            console.log("CCCC: ", singleFile, multiFile, c2)
            content = multiFile
        } else if (process.platform === "win32") {
            singleFile = clipboard.readBuffer('FileNameW').toString('ucs2')
            multiFile = clipboard.readBuffer('CF_HDROP').toString('ucs2')
            let c2 = clipboard.readText()
            console.log("CCCC: ", singleFile, multiFile, c2)
            content = multiFile
            content = clipboard.readText()
        } else {
            // LINUX
            content = clipboard.readText()
        }
        return {
            textContent: content,
            singleFile,
            multiFile
        }
    }
}