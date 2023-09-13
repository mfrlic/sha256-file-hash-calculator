const SAVE_DATA_COOKIE = "file_hasher_save_results";

const CHUNK_SIZE = 1024 * 1024; // 1 MB

const RESULT_HISTORY_KEY = "resultHistory";

const MAX_FILE_SIZE = Math.pow(1024, 3) * 10; // 10 GB

export { SAVE_DATA_COOKIE, CHUNK_SIZE, RESULT_HISTORY_KEY, MAX_FILE_SIZE };
