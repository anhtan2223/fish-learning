'use client'
import { useTheme } from "next-themes";
import Image from "next/image";


export default function Logo() {
  const { resolvedTheme } = useTheme()

  return (
    <Image src={resolvedTheme == 'dark' ? '/logo.dark.png' : '/logo.light.png'}
      width={100} height={100}
      className='w-auto h-[60px] ' alt='Logo'></Image>
  );
}