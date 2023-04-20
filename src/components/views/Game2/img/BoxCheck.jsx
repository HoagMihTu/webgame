import "../Game2.css"
import { data } from "./img"

export default function BoxCheck(props) {
    if(props.isPaused == true){
        return (
            <div className="show-img-2-1">
                <div className="show-dot-2-1" style={{backgroundColor: data[props.item].color}}></div>
            </div>
        )
    } else {
        return (
            <div className="show-img-2-2">
                <div className="show-dot-2-2" style={{backgroundColor: data[props.item].color}}></div>
            </div>
        )
    }
}
