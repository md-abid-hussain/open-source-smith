import { TemplateStrategy } from "./TemplateStrategy";
import { BackendStarterKit } from "./BackendStarterKit";
import { FrontendStarterKit } from "./FrontendStarterKit";
import { NextJsStarterKit } from "./NextJsStarterKit";
import { select } from "@inquirer/prompts";
import fs from "fs";
import path from "path";

export class FullStackStarterKit implements TemplateStrategy {
  async generate(projectName: string): Promise<void> {
    const template = await select({
      message: "Select a template",
      choices: [
        { name: "FullStack - Express(Backend)", value: "template-fullstack" },
        {
          name: "FullStack - NextJs + PostgreSQL(neon)",
          value: "template-nextjs",
        },
      ],
    });

    if (template === "template-fullstack") {
      this.generateFullStackProject(projectName);
    } else {
      new NextJsStarterKit().generate(projectName);
    }
  }
  generateFullStackProject(projectName: string) {
    const projectPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    }

    // Create backend and frontend directories
    const backendPath = path.join(projectPath, "backend");
    const frontendPath = path.join(projectPath, "frontend");

    if (!fs.existsSync(backendPath)) {
      fs.mkdirSync(backendPath);
    }

    if (!fs.existsSync(frontendPath)) {
      fs.mkdirSync(frontendPath);
    }

    process.chdir(projectPath);
    // Generate Express backend
    const backendStarterKit = new BackendStarterKit();

    // Generate React frontend
    const frontendStarterKit = new FrontendStarterKit();
    frontendStarterKit.generate("frontend").then(() => {
      backendStarterKit.generate("backend");
    });

    console.log(`Full stack project ${projectName} initialized`);
  }
}
