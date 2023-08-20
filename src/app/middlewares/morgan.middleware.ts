import morgan from 'morgan';
export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms\n" +
    "User Type: :user-type\n" +
    "Request Body: :req-body\n",
  {
    stream: {
      write: (message: string) => {
        // You can customize how the log is written, e.g., send to a logging service
        console.log(message);
      },
    },
  }
);

