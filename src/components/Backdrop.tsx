interface IBackdropProps {
  onClick: () => void;
}
function Backdrop(props: IBackdropProps) {
  return <div className="backdrop" onClick={props.onClick} />;
}
export default Backdrop;
