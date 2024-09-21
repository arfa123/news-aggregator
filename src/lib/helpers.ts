export const wait = (time = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const deepClone = <T>(obj: T): T => {
  try {
    return structuredClone(obj);
  } catch (error) {
    // console.warn(
    //   "structuredClone failed, falling back to JSON methods:",
    //   error
    // );
    return JSON.parse(JSON.stringify(obj));
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
