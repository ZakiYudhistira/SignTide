const AVATAR_SIZE = 1024;
const WEBP_QUALITY = 0.86;

export async function cropAvatarToSquare(file: File): Promise<File> {
  let image: ImageBitmap;

  try {
    image = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Foto tidak dapat dibaca. Pilih file gambar lain.");
  }

  try {
    const sourceSize = Math.min(image.width, image.height);
    if (sourceSize < 1) {
      throw new Error("Foto tidak memiliki ukuran yang valid.");
    }

    const outputSize = Math.min(sourceSize, AVATAR_SIZE);
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Foto tidak dapat diproses.");

    const sourceX = (image.width - sourceSize) / 2;
    const sourceY = (image.height - sourceSize) / 2;
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      outputSize,
      outputSize,
    );

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) =>
          result ? resolve(result) : reject(new Error("Foto tidak dapat diproses.")),
        "image/webp",
        WEBP_QUALITY,
      );
    });

    return new File([blob], "avatar.webp", {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } finally {
    image.close();
  }
}
