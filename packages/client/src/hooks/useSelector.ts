import React from "react";
import { Observable } from "rxjs";

export function useSelector<T>(obs$: Observable<T>, defaultValue: T): T {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    const subscription = obs$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [obs$]);

  return value;
}
