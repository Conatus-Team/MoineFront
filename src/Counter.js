import React, {useState} from "react";

const Counter = () => {
    const style = {
        h2:{
          color: "white",
        }
    }
    // h2 is state
    const [count, setCount] = useState(0);
    // count: ??  setCount: ?? 0 : initial state 

    const onIncrease = () => {
        setCount(count +1);
    };

    const onDecrease = () => {
        setCount(count - 1);
    }

    return (
        <div className="Count">
            <h2 style={style.h2}>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    );
};
export default Counter;