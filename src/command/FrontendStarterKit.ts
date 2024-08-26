import { TemplateStrategy } from "./TemplateStrategy";
import { ReactStarterKit } from "./FrontendKit/ReactStarterKit";
import { ViteStarterKit } from "./FrontendKit/ViteStarterKit";
import { NextJsStarterKit } from "./FrontendKit/NextJsStarterKit";
import { select } from "@inquirer/prompts";

export class FrontendStarterKit implements TemplateStrategy {
  async generate(projectName: string): Promise<void> {
    const template = await select({
      message: "Select a template",
      choices: [
        { name: "React starter kit", value: "template-react" },
        { name: "Vite starter kit", value: "template-vite" },
        { name: "NextJS starter kit", value: "template-nextjs" },
      ],
    });

    let strategy: TemplateStrategy;

    switch (template) {
      case "template-react":
        strategy = new ReactStarterKit();
        break;
      case "template-vite":
        strategy = new ViteStarterKit();
        break;
      case "template-nextjs":
        strategy = new NextJsStarterKit();
        break;
      default:
        throw new Error("Unknown template");
    }

    strategy.generate(projectName);
  }
}
