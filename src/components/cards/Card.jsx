import ProgressBar from "@ramonak/react-progress-bar";

export function Card({ theme }) {
  return (
    <>
      <h2>{theme}</h2>
      <ProgressBar completed={60} />
    </>
  );
}
