export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='max-w-5xl mx-auto min-h-screen'>{children}</div>;
}
