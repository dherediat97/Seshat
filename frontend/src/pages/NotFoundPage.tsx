import BackButton from '../components/BackButton';

export default function NotFoundPage() {
  return (
    <>
      <BackButton routeName={'/'} />
      <img
        src="assets/not_found_image.svg"
        style={{
          display: 'block',
          width: 360,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    </>
  );
}
