function compose(...strFns) {
    return (...input) => {
        const resultArr = strFns.map((fn)=>fn(...input));
        return resultArr.join("\n");
    }
}

function composeCustom(joinUsing, ...strFns) {
    return (...input) => {
        const resultArr = strFns.map((fn)=>fn(...input));
        return resultArr.join(joinUsing);
    }
};

export {
    compose,
    composeCustom
};
