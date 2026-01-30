import fs from "fs";
import path from "path";

export function readProject(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (["node_modules", ".git", ".next"].includes(item)) continue;

    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      readProject(fullPath, files);
    } else {
      files.push({
        file: fullPath.replace(dir + "/", ""),
        content: fs.readFileSync(fullPath, "utf-8")
      });
    }
  }

  return files;
}
