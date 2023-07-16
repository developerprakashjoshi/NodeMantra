import fs from "fs";
import * as ejs from "ejs";
import { ucwords, toCamelCase } from "./util/String";

class Artisan {
  async makeFiles(inputFileName: string) {
    const directories = ["controllers", "models", "services", "validators","routes"];
    const className = ucwords(inputFileName);
    const classNameCamelCase = toCamelCase(inputFileName);
    const classNameLowerCase = inputFileName.toLowerCase();
    for (const directory of directories) {
      try {
        let fileName =classNameLowerCase;
        let filePath = "";
        let rendered = "";
        if (directory === "controllers") {
          
          filePath = `./src/app/${directory}/${fileName}.controller.ts`;
          console.log(`Creating ${filePath}`);
          const templatePath =
            "./.node_mantra/sdk/template/app/controllers/starter.controller.ejs";
          rendered = await ejs.renderFile(templatePath, {
            className,
            classNameLowerCase,
            classNameCamelCase
          });
        }
        if (directory === "models") {
          
          filePath = `./src/app/${directory}/${fileName}.schema.ts`;
          console.log(`Creating ${filePath}`);
          const templatePath = "./.node_mantra/sdk/template/app/models/starter.schema.ejs";
          rendered = await ejs.renderFile(templatePath, {
            className,
            classNameLowerCase,
            classNameCamelCase,
          });
        }
        if (directory === "services") {
          
          filePath = `./src/app/${directory}/${fileName}.service.ts`;
          console.log(`Creating ${filePath}`);
          const templatePath =
            "./.node_mantra/sdk/template/app/services/starter.service.ejs";
          rendered = await ejs.renderFile(templatePath, {
            className,
            classNameLowerCase,
            classNameCamelCase,
          });
        }
        if (directory === "validators") {
          
          filePath = `./src/app/${directory}/${fileName}.validator.ts`;
          console.log(`Creating ${filePath}`);
          const templatePath =
            "./.node_mantra/sdk/template/app/validators/starter.validator.ejs";
          rendered = await ejs.renderFile(templatePath, {
            className,
            classNameLowerCase,
            classNameCamelCase,
          });
        }
        if (directory === "routes") {
          filePath = `./src/${directory}/${fileName}.route.ts`;
          console.log(`Creating ${filePath}`);
          const templatePath =
            "./.node_mantra/sdk/template/routes/starter.route.ejs";
          rendered = await ejs.renderFile(templatePath, {
            className,
            classNameLowerCase,
            classNameCamelCase,
          });
        }

        const fileContent = rendered;
        // console.log(fileContent)

        fs.writeFileSync(filePath, fileContent);
        console.log(`Created ${filePath}`);
      } catch (error) {
        console.error(`Error creating ${directory} file:`, error);
      }
    }
  }
}

// Parse command line arguments
const inputFileName = process.argv[2];
const artisan = new Artisan();

// Call the function with the provided activity name
artisan.makeFiles(inputFileName).catch((error) => {
  console.log("Error creating files:", error);
});
