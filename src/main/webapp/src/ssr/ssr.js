const path = require("path");
const fsExtra = require("fs-extra");
const { createBundleRenderer } = require("vue-server-renderer");

// Default options
const options = {
  distPath: path.resolve("../../dist"),
  uvueDir: ".uvue"
};

/**
 * Setup adapter, renderer and middleware
 */
function setup() {
  const { clientManifest, serverBundle, templates } = getBuiltFiles();
  // console.log("clientManifest=>", clientManifest);
  // console.log("serverBundle=>", serverBundle);
  // console.log("templates=>", templates);

  const renderer = createRenderer({ serverBundle, clientManifest, templates });
  console.log(renderer);

  // 在服务器处理函数中……
  const context = { url: "/" };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err);
    }
    console.log(html);
  });
}

/**
 * Read files content for renderer
 */
function getBuiltFiles() {
  console.log("options=>", options);
  const { distPath, uvueDir } = options;

  const serverBundle = path.join(uvueDir, "server-bundle.json");
  const clientManifest = path.join(uvueDir, "client-manifest.json");
  const ssr = path.join(uvueDir, "ssr.html");
  const spa = path.join(uvueDir, "spa.html");

  console.log("serverBundle=>", serverBundle);
  console.log("clientManifest=>", clientManifest);
  console.log("ssr=>", ssr);
  console.log("spa=>", spa);

  return {
    clientManifest: fsExtra.readJsonSync(path.join(distPath, clientManifest)),
    serverBundle: fsExtra.readJsonSync(path.join(distPath, serverBundle)),
    templates: {
      spa: fsExtra.readFileSync(path.join(distPath, spa), "utf-8"),
      ssr: fsExtra.readFileSync(path.join(distPath, ssr), "utf-8")
    }
  };
}

/**
 * Return new instance of a renderer
 */
function createRenderer({ serverBundle, clientManifest, templates }) {
  return createBundleRenderer(serverBundle, {
    runInNewContext: false,
      clientManifest,
      templates
  });
}

setup();