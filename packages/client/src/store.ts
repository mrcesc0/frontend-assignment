import { ApolloError } from "@apollo/client";
import { BehaviorSubject } from "rxjs";

/**
 * My store is just a singleton that handles the data I need to share with other components
 * @see {@link https://refactoring.guru/design-patterns/singleton/typescript/example#example-0--index-ts}
 */
export class Store {
  private static instance: Store;
  public readonly searchTerm$ = new BehaviorSubject<string>("");
  public readonly loading$ = new BehaviorSubject<boolean>(true);
  public readonly error$ = new BehaviorSubject<ApolloError | undefined>(
    undefined
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  setSearchTerm(value: string): void {
    this.searchTerm$.next(value);
  }

  setLoading(value: boolean): void {
    this.loading$.next(value);
  }

  setError(error: ApolloError | undefined): void {
    this.error$.next(error);
  }
}
