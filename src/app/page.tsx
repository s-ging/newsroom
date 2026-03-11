import Image from "next/image";
import { PressRelease } from '@/components/press-release';
import { mockPressRelease } from '@/services/mock-press-release';


export default function Home() {
  return (
    <main>
      <PressRelease data={mockPressRelease} />
    </main>
  );
}
