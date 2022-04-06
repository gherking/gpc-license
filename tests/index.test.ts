import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import License, { LicenseConfig } from "../src";

const cleanLocationInfo = (ast: Document): void => {
  delete ast.sourceFile;
  delete ast.targetFile;
  delete ast.sourceFolder;
  delete ast.targetFolder;
}

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
  const ast = await load(`./tests/data/${folder}/${file}`);
  cleanLocationInfo(ast[0]);
  return ast[0];
}

const checkConfig = async (testCase: string, config?: Partial<LicenseConfig>): Promise<void> => {
  const input = await loadTestFeatureFile("input", `${testCase}.feature`);
  const expected = await loadTestFeatureFile("expected", `${testCase}.feature`);
  const actual = process(input, new License(config));

  cleanLocationInfo(actual[0]);
  delete expected.uri;
  delete actual[0].uri;

  pruneID(actual);
  pruneID(expected);

  expect(actual).toHaveLength(1);
  expect(actual[0]).toEqual(expected);
}

describe("License", () => {
  test("should handle empty config", () => {
    expect(() => new License()).toThrow();
  });

  test("should handle missing license file if token is set", () => {
    expect(() => new License({
      licenseText: '${LICENSE}',
    })).toThrow();
  });

  test("should handle if both set and no token", () => {
    expect(() => new License({
      licenseFile: 'LICENSE',
      licenseText: 'TEXT',
    })).toThrow();
  });

  test("should handle if license file does not exist", () => {
    expect(() => new License({
      licenseFile: 'NO_FILE',
    })).toThrow();
  });

  test("should add license statement with start comment", async () => {
    await checkConfig("with-start-comment", {
      licenseFile: 'LICENSE',
      licenseText: '${LICENSE}\n\nAbove this there is the license',
    });
  });

  test("should add license statement without start comment", async () => {
    await checkConfig("without-start-comment", {
      licenseFile: 'LICENSE',
    });
  });
});