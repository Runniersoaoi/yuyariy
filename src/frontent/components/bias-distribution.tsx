// components/BiasDistribution.tsx
import Image from "next/image";

interface Props {
  leftPercentage: number;
  rightPercentage: number;
  centerPercentage: number;
}

export default function BiasDistribution({
  leftPercentage,
  rightPercentage,
  centerPercentage,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl w-full  border">
      <h2 className="text-lg font-semibold mb-2 text-black">
        Detalles de cobertura
      </h2>
      <p className="text-sm text-black mb-3">
        • El {centerPercentage}% de los recursos son de centro, el{" "}
        {rightPercentage}% de los recursos son de derecha y el {leftPercentage}%
        de los recursos son de izquierda
      </p>

      {/* Barra */}
      <div className="flex h-4 rounded-full overflow-hidden">
        <div className="bg-red-900" style={{ width: `${leftPercentage}%` }} />
        <div
          className="bg-gray-500"
          style={{ width: `${centerPercentage}%` }}
        />
        <div className="bg-blue-900" style={{ width: `${rightPercentage}%` }} />
      </div>

      {/* Etiquetas */}
      <div className="flex justify-between text-xs mt-1">
        <span className="text-red-900">I ${leftPercentage}%</span>
        <span className="text-gray-500">C ${centerPercentage}%</span>
        <span className="text-blue-900">D ${rightPercentage}%</span>
      </div>

      {/* Logos */}
      {/* <div className="flex justify-center gap-3 mt-4">
        {[
          "/logos/bloomberg.png",
          "/logos/source2.png",
          "/logos/source3.png",
        ].map((src, i) => (
          <div
            key={i}
            className="bg-white p-2 rounded-full shadow-md w-10 h-10 flex items-center justify-center"
          >
            <Image src={src} alt="Logo" width={28} height={28} />
          </div>
        ))}
      </div> */}
    </div>
  );
}
