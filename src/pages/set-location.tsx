"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import type { FormEvent } from "react";

import { getCoordinates } from "@/lib/geolocation";

export default function SetLocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  function browserCoordinates() {
    getCoordinates((coords) => {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });
  }

  function userCoordinates(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formLatitude = formData.get("latitude") ?? 0;
    setLatitude(formLatitude as number);
    const formLongitude = formData.get("longitude") ?? 0;
    setLongitude(formLongitude as number);
  }

  function renderCoordinates() {
    if (latitude && longitude) {
      return (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
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
      <button className="btn btn-primary" onClick={browserCoordinates}>
        Allow
      </button>
      <h2 className="mt-3">Option 2</h2>
      <p>Enter in your coordinates.</p>
      <form onSubmit={userCoordinates}>
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
