import prettier from "prettier";
const { indent, hardline, line, group } = prettier.doc.builders;
import {
    EXPRESSION_NEEDED,
    STRING_NEEDS_QUOTES,
    printChildBlock
} from "../util/index.js";

const printOpener = (node, path, print) => {
    node[EXPRESSION_NEEDED] = false;
    node[STRING_NEEDS_QUOTES] = true;
    const parts = [
        node.trimLeft ? "{%-" : "{%",
        " embed ",
        path.call(print, "parent")
    ];
    if (node.argument) {
        parts.push(indent([line, "with ", path.call(print, "argument")]));
    }
    parts.push([line, node.trimRightEmbed ? "-%}" : "%}"]);
    return group(parts);
};

const p = (node, path, print) => {
    const children = printChildBlock(node, path, print, "blocks");
    const printedOpener = printOpener(node, path, print);
    const closing = [
        hardline,
        node.trimLeftEndembed ? "{%-" : "{%",
        " endembed ",
        node.trimRight ? "-%}" : "%}"
    ];

    return [printedOpener, children, closing];
};

export { p as printEmbedStatement };
