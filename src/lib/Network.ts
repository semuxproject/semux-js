/**
 * This class represents a network byte and label.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/Network.java
 */
export default class Network {

  public static get MAINNET(): Network {
    return new Network(0, "mainnet");
  }

  public static get TESTNET(): Network {
    return new Network(1, "testnet");
  }

  public static get DEVNET(): Network {
    return new Network(2, "devnet");
  }

  /**
   * @param {number} id
   * @returns {Network}
   * @throws {Error}
   */
  public static of(id: number): Network {
    switch (id) {
      case 0:
        return Network.MAINNET;
      case 1:
        return Network.TESTNET;
      case 2:
        return Network.DEVNET;
      default:
        throw new Error("Unsupported network");
    }
  }

  private readonly id: number;

  private readonly label: string;

  public constructor(id: number, label: string) {
    this.id = id;
    this.label = label;
  }

  public getId(): number {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

}
