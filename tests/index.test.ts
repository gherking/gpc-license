import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import Template, { Config } from "../src";

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

const checkConfig = async (testCase: string, config: Partial<Config>): Promise<void> => {
  const input = await loadTestFeatureFile("input", `${testCase}.feature`);
  const expected = await loadTestFeatureFile("expected", `${testCase}.feature`);
  const actual = process(input, new Template(config));

  cleanLocationInfo(actual[0]);
  delete expected.uri;
  delete actual[0].uri;

  pruneID(actual);
  pruneID(expected);

  expect(actual).toHaveLength(1);
  expect(actual[0]).toEqual(expected);
}

// TODO: Add tests of your precompiler
describe("Template", () => {
  test("should not do anything", async () => {
    await checkConfig("test", {});
  });
});