//layout.js
import { Providers } from "@/app/lib/provider";
import "./assets/styles/style.min.css"

export const metadata = {
  title: "Book Library",
  description: "Buy books or go away!",
};

const RootLayout = ({ children }: {children:React.ReactNode}) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;