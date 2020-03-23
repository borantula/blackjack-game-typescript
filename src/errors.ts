export class NotEnoughCardsInDeckError extends Error {
  // we have to do the following because of: https://github.com/Microsoft/TypeScript/issues/13965
  // otherwise we cannot use instanceof later to catch a given type
  public __proto__: Error;

  constructor(message?: string) {
    const trueProto = new.target.prototype;
    super(message);

    this.__proto__ = trueProto;
  }
}
