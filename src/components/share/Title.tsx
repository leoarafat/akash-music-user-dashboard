const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={`${className} text-2xl font-semibold leading-8 text-[#12354E]`}>{children}</h2>;
};

export default Title;
