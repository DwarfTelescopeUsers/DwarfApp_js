import { useContext } from "react";
import type { FormEvent } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import { wsURL, startGoto } from "@/lib/dwarf2_api";

export default function ExecuteGoto() {
  let connectionCtx = useContext(ConnectionContext);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formRa = Number(formData.get("ra"));
    const formDeclination = Number(formData.get("declination"));
    updateTelescope(formRa, formDeclination);
  }

  function updateTelescope(ra: number, declination: number) {
    const socket = new WebSocket(wsURL);
    let lat = connectionCtx.latitude;
    let lon = connectionCtx.longitude;

    socket.addEventListener("open", () => {
      let planet = null;
      startGoto(socket, planet, ra, declination, lat as number, lon as number);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log(message);
    });

    socket.addEventListener("error", (message) => {
      console.log("err", message);
    });
  }

  return (
    <div>
      <h2>Manual Goto</h2>

      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="ra" className="form-label">
              Right Acension
            </label>
          </div>
          <div className="col-sm-8">
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="ra"
              name="ra"
              placeholder="-12.3456"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="declination" className="form-label">
              Declination
            </label>
          </div>
          <div className="col-sm-8">
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="declination"
              name="declination"
              placeholder="56.7890"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <span className="ms-3">Coming soon...</span>
      </form>
    </div>
  );
}
