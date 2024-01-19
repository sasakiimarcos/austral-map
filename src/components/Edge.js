import Xarrow from "react-xarrows";
import {useRef} from "react";

export const Edge = ({start, end, highlightedNodes}) => {
    const arrowRef = useRef(null);
    return (
        <Xarrow
            color={'lightBlue'}
            path={"straight"}
            divContainerStyle={{opacity: (highlightedNodes.size === 0 || (highlightedNodes.has(start) && highlightedNodes.has(end))) ? 1 : 0.25}}
            strokeWidth={2}
            start={start}
            end={end}
            ref={arrowRef}
            style={{position:'absolute'}}
        />
    )
}
