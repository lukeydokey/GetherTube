const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div>유저페이지 헤더</div>
      {children}
    </section>
  );
};

export default Layout;
