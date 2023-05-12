import { URI, takeAstroDarks, binning2x2 } from "@/lib/dwarf_api";

export default function AstroDarks() {
  function takeAstroDarksHandler() {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      let binning = binning2x2;
      let gain = 10;
      let exposure = 8;
      takeAstroDarks(socket, binning, gain, exposure);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log(message);
    });

    socket.addEventListener("error", (err) => {
      console.error("Error:", err);
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

      <p>
        API Note: The API does not currently return warning about replacing dark
        frames if they exists.
      </p>
      <button
        className="btn btn-secondary"
        disabled
        onClick={takeAstroDarksHandler}
      >
        Not Available Yet
      </button>
    </div>
  );
}
