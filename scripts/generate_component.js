const fs = require("fs");
const path = require("path");

let componentName = process.argv[2];

if (!componentName) {
  console.log("Error: Must provide a component name.");
  process.exit();
}

let commandName = process.argv[3];
if (!commandName) {
  console.log("Error: Must provide a command name.");
  process.exit();
}

if (componentName.split(".").length === 1) {
  componentName = componentName + ".tsx";
}

let filepath = path.join(process.cwd(), "src", "components", componentName);

if (fs.existsSync(filepath)) {
  console.log(componentName, "already exists. Use another component name.");
  process.exit();
}

let templatePath = path.join(__dirname, "templates", "ComponentTemplate.tsx");

try {
  createComponentFile(templatePath, filepath);

  let displayPath = path.join("src", "components", componentName);
  console.log(displayPath + " created");
} catch (error) {
  console.log("Error while creating file.", error);
}

function createComponentFile(templatePath, filepath) {
  let contents = fs.readFileSync(templatePath, "utf8");
  contents = contents.replaceAll("xx_component", componentName.split(".")[0]);
  contents = contents.replaceAll("xx_command", commandName);
  fs.writeFileSync(filepath, contents);
}
