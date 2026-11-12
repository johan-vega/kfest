/** Read dimensions without re-encoding or replacing the user's images. */
export function imageDimensions(bytes, extension) {
  if (extension.toLowerCase() === '.png') {
    if (bytes.length < 24 || bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
      throw new Error('El archivo .png no es PNG real. Exporta la imagen, no cambies solo su extensión.');
    }
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (/^\.jpe?g$/i.test(extension)) {
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('El archivo .jpg no es JPEG real.');
    let offset = 2;
    while (offset + 8 < bytes.length) {
      if (bytes[offset] !== 0xff) break;
      while (bytes[offset] === 0xff) offset++;
      const marker = bytes[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      const size = bytes.readUInt16BE(offset);
      if (size < 2 || offset + size > bytes.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) };
      }
      offset += size;
    }
    throw new Error('No se pudieron leer las dimensiones JPEG.');
  }
  return null;
}
