import { PreCompiler } from "gherking";
import { /* TODO */ } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:template");

// TODO: define your configuration option, if necessary
export interface Config {
  option: string;
}

// TODO: add default options
const DEFAULT_CONFIG: Config = {
  option: "OPTION"
};

// TODO: Add implementation of your precompiler
export default class Template implements PreCompiler {
  private config: Config;

  constructor(config?: Partial<Config>) {
    debug("Intialize");
    this.config = {
      ...DEFAULT_CONFIG,
      ...(config || {}),
    };
  }

  onFeature(): void {
    // TODO: remove
    console.log(this.config);
  }
}

/*
 * @example:
 * export default class MyPrecompiler implements PreCompiler {
 *   constructor(config) {
 *     super();
 *     this.config = config;
 *   }
 * 
 *   onScenario(scenario) {
 *     // doing smth with scenario
 *   }
 * }
 */