import { TemplateStrategy } from "../TemplateStrategy";
import { execSync } from "child_process";
import { confirm } from "@inquirer/prompts";

export class ReactStarterKit implements TemplateStrategy {
  async generate(projectName: string): Promise<void> {
    const useTypescript = await confirm({
      message: "Do you want to use TypeScript?",
      default: true,
    });

    if (useTypescript) {
      this.generateTsProject(projectName);
    } else {
      this.generateJsProject(projectName);
    }
  }

  generateTsProject(projectName: string): void {
    execSync(`npx create-vite@latest ${projectName} --template react-ts`, {
      stdio: "inherit",
    });
    console.log(`React project ${projectName} initialized`);
  }

  generateJsProject(projectName: string): void {
    execSync(`npx create-vite@latest ${projectName} --template react`, {
      stdio: "inherit",
    });
    console.log(`React project ${projectName} initialized`);
  }
}
