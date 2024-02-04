

import type { Metadata } from "next";
import "./globals.css";
import { PokemonProvider } from "./context/pokemonContext";
import Logo from "./components/Logo";
import Link from "next/link";
import Styles from "./styles/layout.module.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Pokedex - Pokemon",
  description: "Busca tu personaje favorito de Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Link href={"/"}>
          <Logo />
        </Link>
        <PokemonProvider>
          {children}
        </PokemonProvider>
        <Footer />
        <img src="/images/wallpaper-prair-pokemon.jpeg" alt="Pokedesk" className={Styles.wallpaper} />
      </body>
    </html>

  );
}
