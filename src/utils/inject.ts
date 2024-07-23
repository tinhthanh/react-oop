import "reflect-metadata";
import { container, InjectionToken } from "tsyringe";
import { AnyType } from "../types/baseType";
export const inject = <T>(intance: InjectionToken<T> ) => container.resolve<T>(intance);

// Custom decorator to reuse singleton
export const Injectable = <T extends { new (...args: AnyType[]): AnyType }>(constructor: T) => {
    container.registerSingleton(constructor);
    return constructor;
  };
  