import { Statement } from "./statement.mjs";

const Divider = (lineBefore, lineAfter) => Statement(` `, lineAfter ? "\n" : "", lineBefore ? "\n" : "");

export {
    Divider
};