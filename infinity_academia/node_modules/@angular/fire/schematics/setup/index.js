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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAddSetupProject = exports.setupProject = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const utility_1 = require("@schematics/angular/utility");
const firebaseTools_1 = require("../firebaseTools");
const utils_1 = require("../utils");
const prompts_1 = require("./prompts");
const setupProject = (tree, context, features, config) => {
    const { projectName } = (0, utils_1.getProject)(config, tree);
    (0, utils_1.addIgnoreFiles)(tree);
    if (features.length) {
        return (0, schematics_1.chain)([
            (0, utility_1.addRootProvider)(projectName, ({ code, external }) => {
                external('initializeApp', '@angular/fire/app');
                return code `${external('provideFirebaseApp', '@angular/fire/app')}(() => initializeApp(${JSON.stringify(config.sdkConfig)}))`;
            }),
            ...(0, utils_1.featureToRules)(features, projectName),
        ]);
    }
};
exports.setupProject = setupProject;
const ngAddSetupProject = (options) => (host, context) => __awaiter(void 0, void 0, void 0, function* () {
    let projectRoot = host._backend._root;
    if (process.platform.startsWith('win32')) {
        projectRoot = (0, core_1.asWindowsPath)((0, core_1.normalize)(projectRoot));
    }
    const features = yield (0, prompts_1.featuresPrompt)();
    if (features.length > 0) {
        const firebaseTools = yield (0, firebaseTools_1.getFirebaseTools)();
        if (!host.exists('/firebase.json')) {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectRoot, 'firebase.json'), '{}');
        }
        const user = yield (0, prompts_1.userPrompt)({ projectRoot });
        const defaultUser = yield firebaseTools.login(options);
        if (user.email !== (defaultUser === null || defaultUser === void 0 ? void 0 : defaultUser.email)) {
            yield firebaseTools.login.use(user.email, { projectRoot });
        }
        const { projectName: ngProjectName } = (0, utils_1.getProject)(options, host);
        const [defaultProjectName] = (0, utils_1.getFirebaseProjectNameFromHost)(host, ngProjectName);
        const firebaseProject = yield (0, prompts_1.projectPrompt)(defaultProjectName, { projectRoot, account: user.email });
        let firebaseApp;
        let sdkConfig;
        if (features.length) {
            firebaseApp = yield (0, prompts_1.appPrompt)(firebaseProject, undefined, { projectRoot });
            const result = yield firebaseTools.apps.sdkconfig('web', firebaseApp.appId, { nonInteractive: true, projectRoot });
            sdkConfig = result.sdkConfig;
        }
        return (0, exports.setupProject)(host, context, features, Object.assign(Object.assign({}, options), { firebaseProject, firebaseApp, sdkConfig }));
    }
});
exports.ngAddSetupProject = ngAddSetupProject;
