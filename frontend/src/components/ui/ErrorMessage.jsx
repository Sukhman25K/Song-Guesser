function ErrorMessage( {message, onRetry}) {
    return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20 text-center px-6">
      <p className="font-display text-3xl text-accent">Something went wrong</p>
      <p className="text-muted max-w-md">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="bg-accent text-text font-display px-5 py-2 rounded-lg hover:opacity-90 transition">
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;