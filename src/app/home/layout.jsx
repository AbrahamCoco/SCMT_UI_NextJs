import Menu from "@/components/Menu";

export const metadata = {
  title: "SCMT - Home",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
