import Xarrow from "react-xarrows";
import {useRef} from "react";

export const Edge = ({start, end, hoveredNode}) => {
    const arrowRef = useRef(null);
    return (
        <Xarrow
            color={'lightBlue'}
            path={"straight"}
            divContainerStyle={{opacity: (hoveredNode === start || hoveredNode === end || hoveredNode === null) ? 1 : 0.25}}
            strokeWidth={2}
            start={start}
            end={end}
            ref={arrowRef}
        />
    )
}
