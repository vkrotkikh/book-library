//layout.js
import { Providers } from "@/lib/provider";
import "./assets/styles/style.min.css"

export const metadata = {
  title: "Book Library",
  description: "Buy books or go away!",
};

const RootLayout = ({ children }: {children:any}) => {
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