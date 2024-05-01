export const Footer = ({ children }) => {
  return (
    <div className={"w-full h-full max-h-fit min-h-fit flex flex-col"}>
      <main>{children}</main>
      <footer className={"w-full h-screen bg-black text-white  "}>
        Footer
      </footer>
    </div>
  );
};
