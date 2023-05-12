import Link from "next/link";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`mt-5 py-4 ${styles.footer}`}>
      <div className="container">
        <Link href="https://github.com/DwarfTelescopeUsers/DwarfApp_js">
          Github
        </Link>
      </div>
    </footer>
  );
}
