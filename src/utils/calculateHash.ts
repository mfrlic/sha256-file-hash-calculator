import CryptoJS from "crypto-js";
import { CHUNK_SIZE } from "../constants";

function calculateRemainingTime(
  iterationPerformances: number[],
  totalIterations: number
) {
  const currentIteration = iterationPerformances.length - 2; // -2 because we want to ignore the latest iteration
  const remainingIterations = totalIterations - currentIteration;

  const averageIterationPerformance =
    iterationPerformances.reduce((a, b) => a + b) /
    iterationPerformances.length;

  const remainingTime = remainingIterations * averageIterationPerformance;

  return remainingTime;
}

// source: https://gist.github.com/artjomb/7ef1ee574a411ba0dd1933c1ef4690d1
function byteArrayToWordArray(byteArray: Uint8Array) {
  const wordArray: number[] = [];

  for (let i = 0; i < byteArray.length; i++) {
    wordArray[(i / 4) | 0] |= byteArray[i] << (24 - 8 * i);
  }

  return CryptoJS.lib.WordArray.create(wordArray, byteArray.length);
}

async function calculateHash(
  file: File,
  progressCallback: (progress: number, timeRemaining: number) => void
) {
  const hash = CryptoJS.algo.SHA256.create();
  const totalSize = file.size;

  // used to calculate time remaining
  const iterationPerformances: number[] = [];
  const numOfIterations = Math.ceil(totalSize / CHUNK_SIZE);

  for (
    let currentSize = 0;
    currentSize < totalSize;
    currentSize += CHUNK_SIZE
  ) {
    const iterationStartTime = performance.now();

    const chunkStart = currentSize;
    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, totalSize);
    const chunk = file.slice(chunkStart, chunkEnd);

    const chunkByteArray = new Uint8Array(await chunk.arrayBuffer());

    hash.update(byteArrayToWordArray(chunkByteArray));

    const progress = (currentSize / totalSize) * 100;

    iterationPerformances.push(performance.now() - iterationStartTime);

    progressCallback(
      progress,
      calculateRemainingTime(iterationPerformances, numOfIterations)
    );
  }

  return hash.finalize().toString(CryptoJS.enc.Hex);
}

export default calculateHash;
