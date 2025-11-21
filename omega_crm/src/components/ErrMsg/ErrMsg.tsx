import './ErrMsg.css';

function ErrMsg ({ message }: {message: string}) {
  return (
    <p className="errorMessage" role="alert">{message}</p>
  )
}

export default ErrMsg;