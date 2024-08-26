import { TemplateStrategy } from "./TemplateStrategy";
import { ExpressStarterKit } from "./ExpressStarterKit";

export class BackendStarterKit implements TemplateStrategy {
  generate(projectName: string): void {
    const strategy: TemplateStrategy = new ExpressStarterKit();
    strategy.generate(projectName);
  }
}
