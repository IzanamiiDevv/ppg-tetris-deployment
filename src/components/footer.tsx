export default function Footer() {
  const colors = [
    "bg-gradient-to-b from-blue-700 to-blue-400",
    "bg-gradient-to-b from-green-700 to-green-400",
    "bg-gradient-to-b from-red-700 to-red-400",
    "bg-gradient-to-b from-yellow-700 to-yellow-400",
    "bg-gradient-to-b from-green-700 to-green-400",
    "bg-gradient-to-b from-yellow-700 to-yellow-400",
    "bg-gradient-to-b from-red-700 to-red-400",
    "bg-gradient-to-b from-blue-700 to-blue-400",
  ];

  const char = ["P", "P", "G", ""];

  return (
    <div className="w-full">
      <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10">
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 48 }).map((_, i) => {
            const isFourth = (i + 1) % 4 === 0;
            const color = isFourth
              ? "bg-gradient-to-b from-yellow-700 to-yellow-400"
              : colors[i % colors.length];

            return (
              <div
                key={i}
                className={`w-[12.5%] h-12 xs:w-[8.333%] xs:h-10 sm:w-[6.25%] sm:h-8 md:w-[4.166%] md:h-6 lg:w-[2.083%] lg:h-4 flex items-center justify-center ${color} transition-all`}
              >
                <span className="text-black font-bold text-[8px] xs:text-[10px] sm:text-xs">
                  {!isFourth ? char[i % char.length] : ""}
                </span>
              </div>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
