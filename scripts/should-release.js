const childProccess = require('child_process');

const globalPackages = childProccess.execSync('npm root -g').toString().trim();
const semver = require(`${globalPackages}/semver`);

const packageFile = require('../package.json');

async function init() {
  if (!semver.valid(packageFile.version)) {
    throw new Error(`Invalid Version: ${packageFile.version}`);
  }

  console.log('NEW VERSION:' + packageFile.version);

  const remoteVersion = await exec(`npm view ${packageFile.name} version`);
  packageFile.remoteVersion = remoteVersion;

  console.log(`REMOTE VERSIONS: ${packageFile.remoteVersion}`);

  const isGreater = semver.gt(packageFile.version, packageFile.remoteVersion);

  if (!isGreater) {
    console.log('Version already published, skipping...');
    await exec('echo true > .skip-release');
    return;
  }

  await exec('echo false > .skip-release');
}

function exec(command, live) {
  return new Promise((resolve, reject) => {
    const cmd = childProccess.exec(command, { env: { ...process.env } }, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout.trim());
    });

    if (!live) return;
    cmd.stdout.on('data', data => console.log(data.toString()));
  });
}

init()
  .then(() => {
    console.log(`NEW VERSION CAN BE PUBLISHED: ${packageFile.version}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
