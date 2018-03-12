declare module "ripemd160" {

  export default class RIPEMD160 {
    constructor();

    public update(data: string | Uint8Array, encoding?: string): RIPEMD160;

    public digest(): Uint8Array;
  }

}
