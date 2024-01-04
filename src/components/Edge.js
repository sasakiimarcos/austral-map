import Xarrow from "react-xarrows";


export const Edge = ({start, end}) => {
    return (
        <Xarrow
            color={'lightBlue'}
            path={"straight"}
            strokeWidth={2}
            start={start}
            end={end}
        />
    )
}
