"use client"
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main>
//     </main>
//   );
// }


import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
      const router = useRouter();

      useEffect(() => {
        router.push("/Home");
      }, []);

      return <></>;
}
