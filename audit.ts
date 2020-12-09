import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as fs from "fs";
import * as glob from "glob";

// Keep track of which args are passed to `coffee.brew`.
const args = [
  {}, // tracks first argument
  {}, // tracks second argument
];

// Find all files at any directory level starting in this directory,
// except anything that is in `node_modules`.
const files = glob.sync("./**/*.js", { ignore: "./node_modules/**" });

files.forEach((file) => {
  const contents = fs.readFileSync(file).toString();

  const ast = parse(contents, {
    sourceType: "module",
    plugins: [],
  });

  traverse(ast, {
    CallExpression(path) {
      const { node } = path;

      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "coffee" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "brew"
      ) {
        node.arguments.forEach((argument, index) => {
          if (argument.type !== "StringLiteral") return;

          const { value } = argument;
          if (args[index][value]) {
            args[index][value] += 1;
          } else {
            args[index][value] = 1;
          }
        });
      }
    },
  });
});

console.log(args);
