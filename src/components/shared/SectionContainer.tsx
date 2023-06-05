interface SectionContainerprops {
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerprops> = ({ children }) => {
  return <div className="w-11/12 mx-auto mt-20">{children}</div>;
};

export default SectionContainer;
