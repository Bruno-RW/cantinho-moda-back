interface ErrorMessageProps { message?: string };

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <span className="text-red-500">{message}</span>;
}
export default ErrorMessage;