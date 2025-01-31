function handleError(err: any): string {
  console.error(err.message);
  let message = "";
  if (err.response?.status === 404) {
    message = "User doesn't exist";
  } else if (err.response?.status === 403) {
    message = "API rate limit exceeded";
  } else if (err.response?.status === 401) {
    message = "Unauthorized";
  } else {
    message = err.message;
  }
  return message;
}

export default handleError;
