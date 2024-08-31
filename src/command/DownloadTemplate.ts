import fs from "fs";
import path from "path";
import simpleGit from "simple-git";

export async function downloadTemplate(template: string, projectName: string) {
  const projectPath = path.join(process.cwd(), projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  const templatePath = path.join(projectPath, "template");

  const ora = (await import("ora")).default;
  const spinner = ora("Fetching template details...\n").start();

  const response = await fetch(
    `https://https://opensourcesmith.vercel.app/api/github/${template}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      console.error("Template not found");
    } else {
      console.error("An error occurred while downloading the template");
    }
    spinner.fail("Failed to fetch template details");
    return;
  }

  const templateConfig = await response.json();
  const githubUrl = templateConfig.githubUrl;
  spinner.succeed("Fetched template details");

  console.log(`Template found at : ${githubUrl}`);

  try {
    spinner.start("Downloading template from GitHub");
    const git = simpleGit();
    await git.clone(githubUrl, templatePath);
    spinner.succeed("Template downloaded successfully");

    spinner.start("Copying template files");
    copyDirectory(templatePath, projectPath);
    spinner.succeed("Template files copied successfully");

    fs.rmSync(templatePath, { recursive: true, force: true });

    console.log(`Project ${projectName} initialized with template ${template}`);
  } catch (err) {
    spinner.fail("Failed to initialize project");
    console.error("An error occurred:", err);
  }
}

function copyDirectory(src: string, dest: string): void {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
