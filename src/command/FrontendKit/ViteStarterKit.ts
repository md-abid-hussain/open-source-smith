import { TemplateStrategy } from "./TemplateStrategy";
import { execSync } from "child_process";

export class ViteStarterKit implements TemplateStrategy {
  async generate(projectName: string): Promise<void> {
    execSync(`npx create-vite@latest ${projectName}`, {
      stdio: "inherit",
    });
  }
}
