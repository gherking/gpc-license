import { existsSync, readFileSync } from 'fs';
import { PreCompiler } from "gherking";
import { Comment, Document } from "gherkin-ast";
import { lines } from "lines-builder";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:license");

// TODO: define your configuration option, if necessary
export interface LicenseConfig {
  licenseFile?: string;
  licenseText?: string;
}

// TODO: Add implementation of your precompiler
export default class License implements PreCompiler {
  private static readonly TEXT_PLACEHOLDER = '${LICENSE}';
  private readonly config: LicenseConfig;

  constructor(config?: Partial<LicenseConfig>) {
    debug("Intialize(config: %o)", config);
    this.config = License.processConfig(config || {});
    debug("config: %o", this.config);
  }

  private static processConfig(config: Partial<LicenseConfig>): LicenseConfig {
    debug("processConfig(config: %o)", config);
    if (!config.licenseText && !config.licenseFile) {
      throw new Error('gpc-license: Either a license text or a license file must be set!');
    }
    if (config.licenseText) {
      const hasToken = config.licenseText?.includes(License.TEXT_PLACEHOLDER);
      debug("has token:", hasToken);
      if (!config.licenseFile && hasToken) {
        throw new Error('gpc-license: License file must be set if ${LICENSE} token is set in the license text!');
      }
      if (config.licenseFile && !hasToken) {
        throw new Error(
          'gpc-license: Both license file and license text are set. '
          + 'Either remove one or use ${LICENSE} in the license text '
          + 'to indicate where to merge the license file content!'
        );
      }
    }
    if (config.licenseFile) {
      if (!existsSync(config.licenseFile)) {
        throw new Error(`gpc-license: License file not found: ${config.licenseFile}!`);
      }
      if (!config.licenseText) {
        config.licenseText = '${LICENSE}';
      }
    }
    return config;
  }

  private get license(): string {
    let licenseText: string = this.config.licenseText;
    if (this.config.licenseFile) {
      licenseText = licenseText.replace(
        License.TEXT_PLACEHOLDER,
        readFileSync(this.config.licenseFile, { encoding: "utf-8" }).trim(),
      );
    }
    return lines({
      indent: '# ',
      indentEmpty: false,
      trimLeft: true,
      trimRight: true,
    }, licenseText).toString();
  }

  onDocument(d: Document): void {
    debug('onDocument(startComment: %o)', d.startComment);
    if (d.startComment) {
      d.startComment = new Comment([
        this.license,
        "",
        d.startComment.text,
      ].join("\n"));
    } else {
      d.startComment = new Comment(this.license);
    }
  }
}