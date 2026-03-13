const fs = require("fs");
const path = require("path");
const {
  AndroidConfig,
  createRunOncePlugin,
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");

const PLUGIN_NAME = "with-service-request-android";
const PLUGIN_VERSION = "1.0.0";

const REQUIRED_PERMISSIONS = [
  "android.permission.SYSTEM_ALERT_WINDOW",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.WAKE_LOCK",
  "android.permission.USE_FULL_SCREEN_INTENT",
];

const NATIVE_FILES = [
  "FloatingBubbleService.java",
  "IncomingRequestActivity.java",
  "RequestActionReceiver.java",
  "RequestForegroundService.java",
  "RequestUiManager.java",
  "ServiceRequestModule.java",
  "ServiceRequestPackage.java",
];

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function addPermission(manifest, permission) {
  manifest.manifest["uses-permission"] = ensureArray(
    manifest.manifest["uses-permission"]
  );

  const exists = manifest.manifest["uses-permission"].some(
    (item) => item.$["android:name"] === permission
  );

  if (!exists) {
    manifest.manifest["uses-permission"].push({
      $: { "android:name": permission },
    });
  }
}

function addComponent(mainApplication, key, name, extraProps = {}) {
  mainApplication[key] = ensureArray(mainApplication[key]);
  const exists = mainApplication[key].some(
    (item) => item.$["android:name"] === name
  );

  if (!exists) {
    mainApplication[key].push({
      $: {
        "android:name": name,
        ...extraProps,
      },
    });
  }
}

function copyNativeFiles(projectRoot, packageName) {
  const sourceDir = path.join(
    projectRoot,
    "plugins",
    "service-request-native",
    "android"
  );
  const targetDir = path.join(
    projectRoot,
    "android",
    "app",
    "src",
    "main",
    "java",
    ...packageName.split("."),
    "servicerequest"
  );

  fs.mkdirSync(targetDir, { recursive: true });

  for (const fileName of NATIVE_FILES) {
    const template = fs.readFileSync(path.join(sourceDir, fileName), "utf8");
    const contents = template.replace(/__PACKAGE__/g, packageName);
    fs.writeFileSync(path.join(targetDir, fileName), contents);
  }
}

function patchMainApplication(projectRoot, packageName) {
  const kotlinPath = path.join(
    projectRoot,
    "android",
    "app",
    "src",
    "main",
    "java",
    ...packageName.split("."),
    "MainApplication.kt"
  );
  const javaPath = path.join(
    projectRoot,
    "android",
    "app",
    "src",
    "main",
    "java",
    ...packageName.split("."),
    "MainApplication.java"
  );

  if (fs.existsSync(kotlinPath)) {
    let contents = fs.readFileSync(kotlinPath, "utf8");
    if (!contents.includes("servicerequest.ServiceRequestPackage")) {
      contents = contents.replace(
        /import expo\.modules\.ApplicationLifecycleDispatcher/,
        "import expo.modules.ApplicationLifecycleDispatcher\nimport __PACKAGE__.servicerequest.ServiceRequestPackage"
      );
      contents = contents.replace(/__PACKAGE__/g, packageName);
    }
    if (!contents.includes("add(ServiceRequestPackage())")) {
      contents = contents.replace(
        "PackageList(this).packages.apply {",
        "PackageList(this).packages.apply {\n      add(ServiceRequestPackage())"
      );
    }
    fs.writeFileSync(kotlinPath, contents);
    return;
  }

  if (fs.existsSync(javaPath)) {
    let contents = fs.readFileSync(javaPath, "utf8");
    if (!contents.includes("servicerequest.ServiceRequestPackage")) {
      contents = contents.replace(
        /import expo\.modules\.ApplicationLifecycleDispatcher;/,
        "import expo.modules.ApplicationLifecycleDispatcher;\nimport __PACKAGE__.servicerequest.ServiceRequestPackage;"
      );
      contents = contents.replace(/__PACKAGE__/g, packageName);
    }
    if (!contents.includes("new ServiceRequestPackage()")) {
      contents = contents.replace(
        "List<ReactPackage> packages = new PackageList(this).getPackages();",
        "List<ReactPackage> packages = new PackageList(this).getPackages();\n    packages.add(new ServiceRequestPackage());"
      );
    }
    fs.writeFileSync(javaPath, contents);
  }
}

const withServiceRequestAndroid = (config) => {
  config = withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults;
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      manifest
    );

    REQUIRED_PERMISSIONS.forEach((permission) =>
      addPermission(manifest, permission)
    );

    addComponent(
      mainApplication,
      "service",
      ".servicerequest.FloatingBubbleService",
      {
        "android:enabled": "true",
        "android:exported": "false",
      }
    );
    addComponent(
      mainApplication,
      "service",
      ".servicerequest.RequestForegroundService",
      {
        "android:enabled": "true",
        "android:exported": "false",
        "android:foregroundServiceType": "mediaPlayback",
      }
    );
    addComponent(
      mainApplication,
      "receiver",
      ".servicerequest.RequestActionReceiver",
      {
        "android:enabled": "true",
        "android:exported": "false",
      }
    );
    addComponent(
      mainApplication,
      "activity",
      ".servicerequest.IncomingRequestActivity",
      {
        "android:enabled": "true",
        "android:excludeFromRecents": "true",
        "android:exported": "false",
        "android:launchMode": "singleTask",
        "android:showWhenLocked": "true",
        "android:turnScreenOn": "true",
        "android:theme": "@style/Theme.AppCompat.Light.NoActionBar",
      }
    );

    return mod;
  });

  config = withDangerousMod(config, [
    "android",
    async (mod) => {
      const packageName = config.android?.package;
      if (!packageName) {
        throw new Error(
          `${PLUGIN_NAME}: android.package must be set in app config.`
        );
      }

      copyNativeFiles(mod.modRequest.projectRoot, packageName);
      patchMainApplication(mod.modRequest.projectRoot, packageName);
      return mod;
    },
  ]);

  return config;
};

module.exports = createRunOncePlugin(
  withServiceRequestAndroid,
  PLUGIN_NAME,
  PLUGIN_VERSION
);
