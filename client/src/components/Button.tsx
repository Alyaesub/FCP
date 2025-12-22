type ButtonProps = {
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ variant, size = 'medium', children, onClick }: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;
