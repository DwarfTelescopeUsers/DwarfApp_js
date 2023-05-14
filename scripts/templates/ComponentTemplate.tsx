import { URI, xx_command } from "@/lib/dwarf_api";

export default function xx_component() {
  function xx_commandHandler() {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      xx_command(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log("xx_command:", message);
    });

    socket.addEventListener("error", (err) => {
      console.error("xx_command error:", err);
    });
  }

  return (
    <div>
      <h1>xx_command</h1>
      <button className="btn btn-secondary" onClick={xx_commandHandler}>
        Start
      </button>
    </div>
  );
}
