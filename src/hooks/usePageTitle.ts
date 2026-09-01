import { useMatches } from "react-router";

type RouteHandle = {
  title?: string;
};

export function usePageTitle() {
  const matches = useMatches();

  const matchWithTitle = [...matches]
    .reverse()
    .find((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return handle?.title;
    });

  const handle = matchWithTitle?.handle as RouteHandle | undefined;

  return handle?.title ?? "";
}