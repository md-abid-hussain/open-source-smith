#!/usr/bin/env node

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import { ExitPromptError } from "@inquirer/core";
import { TemplateStrategy } from "./command/TemplateStrategy";
import { FrontendStarterKit } from "./command/FrontendStarterKit";
import { BackendStarterKit } from "./command/BackendStarterKit";
import { FullStackStarterKit } from "./command/FullStackStarterKit";

const program = new Command();

program
  .name("open-source-smith")
  .description("A CLI tool for managing open-source projects")
  .version("0.0.1");

program
  .command("forge")
  .description("Initialize a new open-source project")
  .action(async () => {
    try {
      const template = await select({
        message: "What do you want to build?",
        choices: [
          { name: "Frontend project", value: "template-frontend" },
          { name: "Backend project", value: "template-backend" },
          { name: "Full stack project", value: "template-full" },
        ],
      });

      const projectName = await input({
        message: "Enter project name",
        default: "my-project",
      });

      let strategy: TemplateStrategy;

      switch (template) {
        case "template-frontend":
          strategy = new FrontendStarterKit();
          break;
        case "template-backend":
          strategy = new BackendStarterKit();
          break;
        case "template-full":
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
