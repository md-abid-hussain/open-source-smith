import { TemplateStrategy } from "./TemplateStrategy";
import { execSync } from "child_process";

export class NextJsStarterKit implements TemplateStrategy {
  generate(projectName: string): void {
    execSync(
      `npx create-next-app ${projectName} --app --eslint --ts --use-npm --skip-install --tailwind --src-dir`,
      { stdio: "inherit" }
    );
    console.log(`Next.js project ${projectName} initialized`);
  }
}
