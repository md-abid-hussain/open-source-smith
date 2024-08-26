#!/usr/bin/env node

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import { ExitPromptError } from "@inquirer/core";
import { TemplateStrategy } from "./command/TemplateStrategy";
import { ExpressStarterKit } from "./command/ExpressStarterKit";
import { ReactStarterKit } from "./command/ReactStarterKit";
import { NextJsStarterKit } from "./command/NextJsStarterKit";
import { FullStackStarterKit } from "./command/FullStackStarterKit";

const program = new Command();

program
  .name("open-source-smith")
  .description("A CLI tool for managing open-source projects")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize a new open-source project")
  .action(async () => {
    try {
      const template = await select({
        message: "Select a template",
        choices: [
          { name: "Express-ts starter kit", value: "template-express-ts" },
          { name: "Full stack starter kit", value: "template-full-stack" },
          { name: "React starter kit", value: "template-react" },
          { name: "NextJS starter kit", value: "template-nextjs" },
        ],
      });

      const projectName = await input({
        message: "Enter project name",
        default: "my-project",
      });

      let strategy: TemplateStrategy;

      switch (template) {
        case "template-express-ts":
          strategy = new ExpressStarterKit();
          break;
        case "template-react":
          strategy = new ReactStarterKit();
          break;
        case "template-nextjs":
          strategy = new NextJsStarterKit();
          break;
        case "template-full-stack":
          strategy = new FullStackStarterKit();
          break;
        default:
          throw new Error("Unknown template");
      }

      strategy.generate(projectName);
    } catch (error) {
      if (error instanceof ExitPromptError) {
        console.log("Prompt was force closed");
        process.exit(0);
      } else {
        console.error("An error occurred:", error);
        process.exit(1);
      }
    }
  });

program.parse(process.argv);

// Handle exit using Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("Received SIGINT. Exiting gracefully...");
  // Perform any necessary cleanup here
  process.exit(0);
});
