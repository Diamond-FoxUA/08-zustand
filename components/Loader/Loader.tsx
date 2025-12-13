import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <RotatingLines
        visible={true}
        width="48"
        strokeColor="#0D6EFD"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="loading"
      />
    </div>
  );
}