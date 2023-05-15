import { shutDown, wsURL, shutDownCmd } from "@/lib/dwarf2_api";

export default function ShutDown() {
  function shutDownHandler() {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start shutDown...");
      shutDown(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === shutDownCmd) {
        console.log("shutDown:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (message) => {
      console.log("shutDown error:", message);
    });
  }

  return (
    <div>
      <h2>Power Management</h2>
      <p>Turn Off Dwarf II</p>
      <button className="btn btn-primary" onClick={shutDownHandler}>
        Off
      </button>
    </div>
  );
}
