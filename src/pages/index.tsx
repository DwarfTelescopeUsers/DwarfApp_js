import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dwarf II Demo</title>
      </Head>
      <h1>Dwarf II Demo</h1>
      <p>
        This website connects to the Dwarf II telescope via the Dwarf II API.
        The Dwarf II API and this website are very much in beta phase, so this
        website has limited functionality.
      </p>

      <div className="container">
        <div className="row g-4 py-4 row-cols-1 row-cols-lg-2">
          <div className="feature col">
            <h3 className="fs-2">Tutorials</h3>
            <p>Read and watch tutorials from Dwarf Lab.</p>
            <a
              href="https://help.dwarflab.com/en-US"
              className="btn btn-primary"
            >
              Learn
            </a>
          </div>

          <div className="feature col">
            <h3 className="fs-2">Setup Scope</h3>
            <p>Connect and setup the Dwarf II.</p>
            <Link href="/setup-scope" className="btn btn-primary">
              Start
            </Link>
          </div>

          {/* <div className="feature col">
            <h3 className="fs-2">Photos</h3>
            <p>View photos stored on the SD card.</p>
            <Link href="/saved-photos" className="btn btn-primary">
              View
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
