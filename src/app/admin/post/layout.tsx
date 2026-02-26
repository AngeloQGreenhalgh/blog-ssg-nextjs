import { MenuAdmin } from '../MenuAdmin';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
