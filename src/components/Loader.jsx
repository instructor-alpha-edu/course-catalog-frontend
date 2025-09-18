export default function Loader({ isFullPage = false }) {
  if (isFullPage) {
    return (
      <div className="lg-loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="sm-loader-container">
      <span className="sm-loader"></span>
    </div>
  );
}
