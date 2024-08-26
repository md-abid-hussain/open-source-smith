import { TemplateStrategy } from "./TemplateStrategy";
import { execSync } from "child_process";

export class ReactStarterKit implements TemplateStrategy {
  generate(projectName: string): void {
    execSync(`npx create-vite@latest ${projectName} --template react-ts`, {
      stdio: "inherit",
    });
    console.log(`React project ${projectName} initialized`);
  }
}
