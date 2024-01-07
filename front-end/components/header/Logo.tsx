import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div role="logo" className="flex items-center gap-5">
      <h1 className="text-4xl">tiStudent</h1>
      <Image
        src="/images/logo.png"
        alt="tiStudent Logo"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "75px", height: "auto" }}
      />
    </div>
  );
};

export default Logo;
