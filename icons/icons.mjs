// @ts-check
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";

// SVG Optimization
import { optimize } from "svgo";

export async function createIconPack({
  inputDir = "../static/icons",
  outputFile = "../static/icon-pack.svg",
  outputTypesFile = "../src/lib/icons.ts",
}) {
  console.log(`📦 Packing ${inputDir.replace("../", "")}*.svg`);

  const filenames = await fs.readdir(
    fileURLToPath(new URL(inputDir, import.meta.url)),
  );

  const svgs = await Promise.all(
    filenames
      .filter((file) => file.endsWith("svg"))
      .map(async (file) => {
        const path = fileURLToPath(
          new URL(`${inputDir}${file}`, import.meta.url),
        );
        return {
          content: await fs.readFile(path).then((res) => res.toString()),
          name: file.slice(0, -4),
          path: file,
        };
      }),
  );

  const icons = svgs.map(({ content, name, path }) => {
    const optimizedSvg = optimize(content, {
      path,
      multipass: true,
      plugins: [
        // set of built-in plugins enabled by default
        "preset-default",
        // unnecessary xml attribute
        "removeXMLNS",
        // width and height
        "removeDimensions",
        "removeUselessStrokeAndFill",
        // add id to svg
        {
          name: "addAttributesToSVGElement",
          params: {
            attributes: [{ "id": `icon-${name}` }],
          },
        },
        // sort attributes
        "sortAttrs",
      ],
    });

    return optimizedSvg.data
      .replace("<svg", `<symbol`)
      .replace("</svg", "</symbol");
  });

  const iconPack = [
    `<svg style="display:none" xmlns="http://www.w3.org/2000/svg"><defs>`,
    icons.join("\n"),
    `</defs></svg>`,
  ].join("\n");

  // Write icon pack
  const outputPath = fileURLToPath(new URL(outputFile, import.meta.url));
  await fs
    .writeFile(outputPath, iconPack)
    .then(() => console.log(`Updated: ${outputFile.replace("../", "")}`))
    .catch(console.error);

  // Update Icon Types
  const outputTypesPath = fileURLToPath(new URL(outputTypesFile, import.meta.url),);
  const types = [
    `export const iconNames = [`,
    `  ${svgs.map(({ name }) => `"${name}"`).join(",\n  ")}`,
    `] as const;`,
  ].join("\n");

  await fs
    .writeFile(outputTypesPath, types)
    .then(() => console.log(`Updated: ${outputTypesFile.replace("../", "")}`))
    .catch(console.error);
}

/** @returns {import("vite").Plugin} */
export function iconPackPlugin({
  inputDir = "../static/icons/",
  outputFile = "../static/icon-pack.svg",
  outputTypesFile = "../src/lib/icons.ts",
} = {}) {
  const inputPath = "static/icons";
  return {
    name: "generate-icons",
    async buildStart() {
      await createIconPack({ inputDir, outputFile, outputTypesFile });
    },
    async watchChange(file, type) {
      if (file.includes(inputPath) && file.endsWith(".svg") && ["create", "delete"].includes(type.event)) {
        await createIconPack({ inputDir, outputFile, outputTypesFile });
      }
    },
    async handleHotUpdate({ file }) {
      if (file.includes(inputPath) && file.endsWith(".svg")) {
        await createIconPack({ inputDir, outputFile, outputTypesFile });
      }
    },
  };
}
