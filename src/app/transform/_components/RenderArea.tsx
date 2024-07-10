import Image from "next/image";
import { useTransferContext } from "../context";

export const RenderArea = () => {
  const { formV, setFormV } = useTransferContext();

  return (
    <div>
      <Image alt="logo" src="/imgs/A4本子.jpg" width={480} height={480 * 1.414} />
    </div>
  );
};
