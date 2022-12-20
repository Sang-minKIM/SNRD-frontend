import ReactLoading, { LoadingType } from "react-loading";

interface ILoaderProp {
  type: LoadingType;
  color: string;
  message: string;
}

export function Loader({ type, color, message }: ILoaderProp) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2>{message}</h2>
        <ReactLoading type={type} color={color} height={"80%"} width={"80%"} />
      </div>
    </>
  );
}
