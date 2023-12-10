const Pair = (X, Y) => {
    return {X: X, Y: Y}
}

const RandVal = (Min, Max, Condition = () => true) => {
    while (true){
        var N =  Math.random() * (Max - Min) + Min
        if (Condition(N))
            return N
    }
}