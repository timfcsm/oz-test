export default function delay(timeout = 0): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
}
