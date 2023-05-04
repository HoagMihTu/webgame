import { useState, useEffect } from 'react'
import "../Game2.css"
import Box from './Box'
import BoxCheck from './BoxCheck'

function Quiz(box,value,item,isPaused) {

    const boxElements = box.map(box => (
        <Box key={box.id} {...box} isPaused={isPaused} item={item}/>
    ))
    const checkBox = (id, isPaused,item) =>{
        return <BoxCheck key={id} isPaused={isPaused} item={item}/>
    }
    for(let i=0;i<value;i++){
        boxElements[i] = checkBox(boxElements[0].props.id, boxElements[0].props.isPaused, boxElements[0].props.item)
    }
    return (
        <div className='gameplay-show-2'>
            {isPaused ?
            <div className="show-img-container-2-1">
                {boxElements}
            </div>
            :
            <div className="show-img-container-2-2">
                {boxElements}
            </div>
            }
        </div>
    )
}

export default Quiz