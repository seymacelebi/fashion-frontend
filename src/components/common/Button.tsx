// interface ButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   type?: 'button' | 'submit' | 'reset';
// }

// const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300"
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
