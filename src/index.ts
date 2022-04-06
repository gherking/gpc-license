import { PreCompiler } from "gherking";
import { /* TODO */ } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:template");

// TODO: define your configuration option, if necessary
export interface LicenseConfig {
  licenseFile?: string;
  licenseText?: string;
  licenseFormat: string;
}

// TODO: add default options
const DEFAULT_CONFIG: LicenseConfig = {
  licenseFormat: '${text}'
};

// TODO: Add implementation of your precompiler
export default class License implements PreCompiler {
  private config: LicenseConfig;

  constructor(config?: Partial<LicenseConfig>) {
    debug("Intialize");
    this.config = {
      ...DEFAULT_CONFIG,
      ...(config || {}),
    };
  }

  onFeature(): void {
    // TODO: remove
    // @ts-ignore
    console.log(this.config);
  }
}