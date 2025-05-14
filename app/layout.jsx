import NavBar from "@/components/NavBar";
import "./globals.css";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Finantial Benefits",
  description: "Prestamos Personales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      className= {roboto.className} >
        {children}
      </body>
    </html>
  );
}
