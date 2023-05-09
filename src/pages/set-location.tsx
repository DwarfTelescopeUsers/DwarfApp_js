"use client";
import Head from "next/head";
import { useContext } from "react";
import type { FormEvent } from "react";

import { getCoordinates } from "@/lib/geolocation";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { saveCoordinatesDB } from "@/db/db_utils";
import { isNumber } from "@/db/data_utils";

export default function SetLocation() {
  let connectionCtx = useContext(ConnectionContext);

  function browserCoordinatesHandler() {
    getCoordinates((coords) => {
      saveCoordinatesDB(coords.latitude, coords.longitude);
      connectionCtx.setLatitude(coords.latitude);
      connectionCtx.setLongitude(coords.longitude);
    });
  }

  function userCoordinatesHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formLatitude = formData.get("latitude");
    const formLongitude = formData.get("longitude");

    if (formLatitude && formLongitude) {
      saveCoordinatesDB(Number(formLatitude), Number(formLongitude));
      connectionCtx.setLatitude(Number(formLatitude));
      connectionCtx.setLongitude(Number(formLongitude));
    }
  }

  function renderCoordinates() {
    if (isNumber(connectionCtx.latitude) && isNumber(connectionCtx.longitude)) {
      return (
        <p>
          Latitude: {connectionCtx.latitude}, Longitude:{" "}
          {connectionCtx.longitude}
        </p>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Set Location</title>
      </Head>
      <h1>Set Location</h1>
      <p>
        If you plan on taking astronomy photos, this site needs your latitude
        and longitude.
      </p>
      {renderCoordinates()}

      <h2>Option 1</h2>
      <p>Allow website to access your location.</p>
      <button className="btn btn-primary" onClick={browserCoordinatesHandler}>
        Allow
      </button>
      <h2 className="mt-3">Option 2</h2>
      <p>Enter in your coordinates.</p>
      <form onSubmit={userCoordinatesHandler}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="latitude" className="form-label">
              Latitude
            </label>
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="latitude"
              name="latitude"
              placeholder="-12.3456"
              required
            />
          </div>

          <div className="col">
            <label htmlFor="longitude" className="form-label">
              Longitude
            </label>
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="longitude"
              name="longitude"
              placeholder="56.7890"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
