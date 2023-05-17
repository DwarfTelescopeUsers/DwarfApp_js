import {
  wsURL,
  binning2x2,
  takeAstroDarks,
  takeAstroDarkFramesCmd,
} from "@/lib/dwarf2_api/";

export default function AstroDarks() {
  function takeAstroDarksHandler() {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start takeAstroDarks...");
      let binning = binning2x2;
      let exposure = 8;
      takeAstroDarks(socket, binning, exposure);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === takeAstroDarkFramesCmd) {
        console.log("takeAstroDarks:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (err) => {
      console.error("takeAstroDarks error:", err);
    });
  }

  return (
    <div>
      <h2>Astro Darks (Work in progress...)</h2>
      <p>
        To improve the quality of astronomy photos, you should shoot dark
        frames. When Dwarf II takes astro photos, it will combine the dark
        frames with the astro photos to remove senor noise from the astro
        photos.
      </p>

      <ol>
        <li className="mb-2">
          Point the Dwarf II lens downward and cover the Dwarf II in order to
          minimize the amount of light that reaches the lens.
        </li>
        <li className="mb-2">
          Click Start. This process will take about ten minutes.
        </li>
      </ol>

      <button className="btn btn-primary" onClick={takeAstroDarksHandler}>
        Start
      </button>
    </div>
  );
}
