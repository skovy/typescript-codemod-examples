import { Transform } from "jscodeshift";
import { isParenthesizedTypeNode } from "typescript";

const transform: Transform = (file, api) => {
  // Alias the jscodeshift API for ease of use.
  const j = api.jscodeshift;

  // Convert the entire file source into a collection of nodes paths.
  const root = j(file.source);

  const brewCalls = root
    .find(j.CallExpression)
    .filter((path) => {
      const { node } = path;

      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "coffee" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "brew"
      ) {
        const [waterArg] = node.arguments;

        return waterArg.type === "StringLiteral" && waterArg.value !== "💧";
      }
    })
    .replaceWith((path) => {
      const { node } = path;

      const [waterArg] = node.arguments;
      if (waterArg.type === "StringLiteral") {
        waterArg.value = "💧";
      }

      return node;
    });

  console.log(brewCalls);

  return root.toSource();
};

export default transform;
