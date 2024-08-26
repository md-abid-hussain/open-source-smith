import { TemplateStrategy } from "../TemplateStrategy";
import fs from "fs";
import path from "path";
import simpleGit from "simple-git";

export class ExpressStarterKit implements TemplateStrategy {
  async generate(projectName: string): Promise<void> {
    const projectPath = path.join(process.cwd(), projectName);

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    }

    const templateRepoUrl =
      "https://github.com/md-abid-hussain/template-express-ts";
    const templatePath = path.join(projectPath, "template-express-ts");

    // Dynamically import ora
    const ora = (await import("ora")).default;
    const spinner = ora("Downloading template...").start();

    try {
      // Clone the template repository
      const git = simpleGit();
      await git.clone(templateRepoUrl, templatePath);
      spinner.succeed("Template downloaded successfully");

      // Copy the contents of the cloned repository to the project directory
      spinner.start("Copying template files...");
      this.copyDirectory(templatePath, projectPath);
      spinner.succeed("Template files copied successfully");

      // Remove the cloned repository directory
      fs.rmSync(templatePath, { recursive: true, force: true });

      console.log(`Express project ${projectName} initialized`);
    } catch (error) {
      spinner.fail("Failed to download template");
      console.error("An error occurred:", error);
    }
  }

  private copyDirectory(src: string, dest: string): void {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
