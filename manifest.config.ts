import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const { version } = packageJson;

const [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);

export const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: "Glerk: Gmail Template Extension",
  description:
    "Glerk allows users to create, manage, and utilize templates with dynamic variables.",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  host_permissions: [
    "http://localhost:5173/",
    "http://localhost:8080/",
    "https://mail.google.com/*",
  ],
  action: {
    default_popup: "index.html",
    default_icon: "favicon.png",
  },
  icons: {
    "16": "favicon.png",
    "32": "favicon.png",
    "128": "favicon.png",
  },
  content_scripts: [
    {
      js: ["src/pages/content/index.tsx"],
      matches: ["https://mail.google.com/*"],
    },
  ],
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
}));

export default manifest;
