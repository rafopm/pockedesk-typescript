import Image from 'next/image';
import React from 'react';
import Styles from '../styles/header.module.css';

type HeaderProps = {
  query: string;
  setQuery: (query: string) => void;
};

const Header = ({ query, setQuery }: HeaderProps) => {
  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <Image src="/images/pokemon_logo.png" alt="Pokedesk" width={200} height={74} className={Styles.logo} />

        <div className={Styles.inputContainer}>

          <input
            value={query}
            placeholder="Busca un Pokemon"
            onChange={(event) => setQuery(event.target.value.trim())}
            type="text"
            className={Styles.search}
          />
          <Image
            src="/images/search.svg"
            alt="Pokedesk"
            width={20}
            height={20}
          className={Styles.searchIcon}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;