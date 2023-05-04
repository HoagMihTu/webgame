import React from "react"
import "../Game1.css"
function Quiz(value,pic,isPaused) {
    const styles = {
        height: isPaused ?  "147px" : "100px"
    }
    console.log(isPaused)
    const renderQuiz = () =>{
        switch(value){
            case 1: {
                return (
                        <div className="show-img1">
                            <img src={pic} className="img-item" style={styles}/>
                        </div>
                )
            }

            case 2: {
                return (
                        <div className="show-img2">
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                        </div>
                )
            }

            case 3: {
                return (
                        <div className="show-img3">
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                        </div>
                )
            }

            case 4: {
                return (
                        <div className="show-img4">
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                        </div>
                )
            }

            case 5: {
                return (
                        <div className="show-img5">
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles}/>
                            <img src={pic} className="img-item" style={styles} />
                        </div>
                )
            }
        }
    }
    return (
        <div className="show-img-container">
            {renderQuiz()}
        </div>
    )
}

export default Quiz