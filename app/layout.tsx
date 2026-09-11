export const metadata = {
  title: "WhatsApp Hub - CRM Integration & Marketing",
  description: "WhatsApp CRM integration and bulk marketing platform for businesses."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
