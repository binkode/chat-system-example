const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 text-white rounded px-4 py-2 ${className}`}
  >
    {children}
  </button>
);
export default Button;
