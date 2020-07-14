import * as core from "@actions/core";
import * as installer from "./installer";

async function run() {
  try {
    let compiler = core.getInput("sml-compiler");
    await installer.getSmackage(compiler);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
