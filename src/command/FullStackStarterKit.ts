import { TemplateStrategy } from "./TemplateStrategy";
import { ExpressStarterKit } from "./ExpressStarterKit";
import { ReactStarterKit } from "./ReactStarterKit";
import fs from "fs";
import path from "path";

export class FullStackStarterKit implements TemplateStrategy {
  generate(projectName: string): void {
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
    const expressStarterKit = new ExpressStarterKit();
    expressStarterKit.generate("backend");

    // Generate React frontend
    const reactStarterKit = new ReactStarterKit();
    reactStarterKit.generate("frontend");

    console.log(`Full stack project ${projectName} initialized`);
  }
}
