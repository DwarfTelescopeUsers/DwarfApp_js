import CameraStatus from "@/components/CameraStatus";
import SetISPSettings from "@/components/SetISPSettings";
import ExecuteGoto from "@/components/ExecuteGoto";

export default function AstroPhoto() {
  return (
    <div>
      <h1>Astro Photos</h1>

      <CameraStatus />
      <hr></hr>

      <SetISPSettings />

      <hr></hr>
      <ExecuteGoto />
    </div>
  );
}
