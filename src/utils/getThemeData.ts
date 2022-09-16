import {theme1, theme2, theme3} from "../styles/themes";

const getThemeData = (theme: string) => {
    switch (theme){
        case "theme1":
            return theme1
        case "theme2":
            return theme2
        case "theme3":
            return theme3
        default:
            return theme1
    }
}

export default getThemeData