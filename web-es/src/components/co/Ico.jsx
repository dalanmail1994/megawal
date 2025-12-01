

export default function Ico({ path, width="25px", height="25px", className }) {
  return (
    <span 
        className={className}
        style={{
            WebkitMaskImage: 'url('+path+')',
            maskImage: 'url('+path+')',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            backgroundColor: 'currentcolor',
            display: 'inline-block',
            width: width,
            height: height,
        }}
    ></span>
  );
}


