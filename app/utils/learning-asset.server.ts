const LEARNING_ASSET_BUCKET = "learning_asset";

export function learningAssetUrl(path: string) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("VITE_SUPABASE_URL is required to load learning assets.");
  }

  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${LEARNING_ASSET_BUCKET}/${encodedPath}`;
}
