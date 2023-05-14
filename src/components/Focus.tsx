import { useState } from "react";

import { wsURL, autoFocus } from "@/lib/dwarf2_api";

export default function AutoFocus() {
  const [status, setStatus] = useState<any[]>([]);

  let showStaus = false;

  function autofocusHandler() {
    setStatus([]);
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      autoFocus(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log("message", message);
      setStatus((prev) => prev.concat(message));
    });

    socket.addEventListener("error", (err) => {
      console.log("Error", err);
    });
  }

  return (
    <div>
      <h2>Manual Focus</h2>

      <p>API Note: The API does not currently support manual focus.</p>

      <ol>
        <li className="mb-2">
          Manually focus the Dwarf II using the mobile app from Dwarf Labs.
        </li>
      </ol>

      <h3>Auto Focus</h3>

      <p>
        Note: Auto focus for nighttime astronomy is buggy. Sometimes it works,
        sometimes it does not work.
      </p>

      <ol>
        <li className="mb-2">Click Start to begin auto focus </li>
      </ol>

      <button className="btn btn-primary" onClick={autofocusHandler}>
        Start
      </button>

      <br />
      {showStaus &&
        status.map((s, i) => <pre key={i}>{JSON.stringify(s, null, 2)}</pre>)}
    </div>
  );
}

/*

{
  "motorId": 3,
  "interface": 10110,
  "direction": 1,
  "distance": 102,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "interface": 11003,
  "value": 93,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 3,
  "interface": 10100,
  "limit": 1,
  "code": -22
}
{
  "motorId": 3,
  "interface": 10100,
  "code": 0
}

*/
