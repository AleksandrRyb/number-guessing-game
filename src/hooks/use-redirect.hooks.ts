import React from "react";

export function useRedirect(
  condition: boolean,
  navigate: any,
  url: string,
  observe: any[]
) {
  const [redirectLoading, setRedirectLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setRedirectLoading(true);
    if (condition) {
      navigate(url);
    }
    setRedirectLoading(false);
  }, []);

  return redirectLoading;
}
