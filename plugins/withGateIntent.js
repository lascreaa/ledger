const { withDangerousMod, withXcodeProject } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');
module.exports = function withGateIntent(config) {
  config = withDangerousMod(config, ['ios', async (config) => {
    const dest = path.join(config.modRequest.platformProjectRoot, config.modRequest.projectName, 'LedgerGateIntent.swift');
    fs.copyFileSync(path.join(config.modRequest.projectRoot, 'native', 'LedgerGateIntent.swift'), dest);
    return config;
  }]);
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const name = config.modRequest.projectName;
    if (!project.hasFile(`${name}/LedgerGateIntent.swift`)) {
      project.addSourceFile(`${name}/LedgerGateIntent.swift`, { target: project.getFirstTarget().uuid }, project.findPBXGroupKey({ name }) || project.findPBXGroupKey({ path: name }));
    }
    return config;
  });
};
