import {signedupgroupname} from "../../../data/consts";

const reset = (elements: any, setElements: (arg0: any) => void) => {
    let tmp = elements
    for (let key of Object.keys(tmp)) {
        if (key !== signedupgroupname) {
            for (let i = 0; i < tmp[key].length; i++) {
                tmp[signedupgroupname].push(tmp[key][i])
            }
            tmp[key] = []
        }
    }

    setElements({...tmp})
}

export default reset