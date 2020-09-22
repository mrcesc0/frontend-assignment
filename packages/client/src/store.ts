import { ApolloError } from "@apollo/client";
import { BehaviorSubject } from "rxjs";

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
}
