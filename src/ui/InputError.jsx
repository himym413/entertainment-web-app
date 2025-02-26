function InputError({ children }) {
  return (
    <span className="absolute bottom-0 right-1 text-bodyS text-accentColor">
      {children}
    </span>
  );
}

export default InputError;
