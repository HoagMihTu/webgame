import "../Game2.css"

export default function Box(props) {
    if(props.isPaused == true){
        return (
            <div className="show-img-2-1">
            </div>
        )
    } else {
        return (
            <div className="show-img-2-2">
            </div>
        )
    }
}