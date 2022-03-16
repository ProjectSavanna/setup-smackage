"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const path = __importStar(require("path"));
function getSmackage(compiler) {
    return __awaiter(this, void 0, void 0, function* () {
        // Step 1. Pick a SMACKAGE_HOME directory.
        let SMACKAGE_HOME = path.join(process.env.HOME, ".smackage");
        core.exportVariable("SMACKAGE_HOME", SMACKAGE_HOME);
        // Step 2. (Ignored.)
        // Step 3. Download.
        yield exec.exec("git", ["clone", "https://github.com/standardml/smackage.git"]);
        yield exec.exec("make", [compiler], { cwd: "smackage" });
        // Step 4. Update your PATH.
        core.addPath(path.join(SMACKAGE_HOME, "bin"));
        // Step 5. Bootstrap.
        yield exec.exec("bin/smackage", ["refresh"], {
            cwd: "smackage"
        });
        yield exec.exec("bin/smackage", ["make", "smackage", compiler], {
            cwd: "smackage"
        });
        yield exec.exec("bin/smackage", ["make", "smackage", "install"], {
            cwd: "smackage"
        });
        // Cleanup!
        exec.exec("rm", ["-rf", "smackage"]);
    });
}
exports.getSmackage = getSmackage;
