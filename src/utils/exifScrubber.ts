export interface IScrubResult {
  cleanBlob: Blob;
  previewUrl: string;
  originalSize: number;
  cleanSize: number;
  reductionPercentage: number;
}

export async function stripImageExif(file: File): Promise<IScrubResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Berkas yang diunggah harus berupa gambar (JPG, PNG, atau WebP).'));
      return;
    }

    const originalSize = file.size;
    const tempUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(tempUrl);

      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Gagal menginisialisasi kanvas grafis peramban.'));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Gagal merekonstruksi berkas gambar bersih.'));
              return;
            }

            const cleanSize = blob.size;
            const reduction = Math.max(0, Math.round(((originalSize - cleanSize) / originalSize) * 100));
            const previewUrl = URL.createObjectURL(blob);

            resolve({
              cleanBlob: blob,
              previewUrl,
              originalSize,
              cleanSize,
              reductionPercentage: reduction
            });
          },
          'image/jpeg',
          0.90
        );
      } catch {
        reject(new Error('Terjadi kendala saat memproses sanitasi piksel gambar.'));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      reject(new Error('Format gambar rusak atau tidak dapat didekode oleh peramban.'));
    };

    img.src = tempUrl;
  });
}
