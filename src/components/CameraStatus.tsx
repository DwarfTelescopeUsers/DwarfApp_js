type PropType = {
  cameraStatusData: any;
  getCameraStatus: () => void;
};

export default function CameraStatus(props: PropType) {
  const { cameraStatusData, getCameraStatus } = props;

  return (
    <>
      <h2>Telephoto camera status</h2>
      <button className="btn btn-primary" onClick={getCameraStatus}>
        Get Status
      </button>
      {cameraStatusData && (
        <pre>{JSON.stringify(cameraStatusData, null, 2)}</pre>
      )}
    </>
  );
}
