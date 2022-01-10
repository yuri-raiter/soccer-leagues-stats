import { useEffect, useRef } from "react";

export function usePrevious(value: string) {
  const ref = useRef<string>('2020-2021')

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}