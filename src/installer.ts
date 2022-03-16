import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as path from "path";

export async function getSmackage(compiler: string): Promise<void> {
  // Step 1. Pick a SMACKAGE_HOME directory.
  let SMACKAGE_HOME = path.join(process.env.HOME!, ".smackage");
  core.exportVariable("SMACKAGE_HOME", SMACKAGE_HOME);

  // Step 2. (Ignored.)

  // Step 3. Download.
  await exec.exec("git", ["clone", "https://github.com/standardml/smackage.git"]);
  await exec.exec("make", [compiler], { cwd: "smackage" });

  // Step 4. Update your PATH.
  core.addPath(path.join(SMACKAGE_HOME, "bin"));

  // Step 5. Bootstrap.
  await exec.exec("bin/smackage", ["refresh"], {
    cwd: "smackage"
  });
  await exec.exec("bin/smackage", ["make", "smackage", compiler], {
    cwd: "smackage"
  });
  await exec.exec("bin/smackage", ["make", "smackage", "install"], {
    cwd: "smackage"
  });

  // Cleanup!
  exec.exec("rm", ["-rf", "smackage"]);
}
