import { roundExposure } from "@/lib/math_utils";

describe("roundExposure", () => {
  it("rounds numbers > .8 to nearest whole number", () => {
    let nums = [
      [0.81, 1],
      [1, 1],
      [1.1, 1],
      [1.5, 2],
      [9.1, 9],
      [9.5, 10],
      [10.1, 10],
      [99.5, 100],
      [100.1, 100],
    ];

    nums.forEach((num) => {
      let res = roundExposure(num[0]);
      expect(res).toEqual(num[1]);
    });
  });

  it("rounds numbers > .08 and <= .8 to nearest tenth", () => {
    let nums = [
      [0.081, 0.1],
      [0.099, 0.1],
      [0.11, 0.1],
      [0.15, 0.2],
      [0.55, 0.6],
      [0.8, 0.8],
    ];

    nums.forEach((num) => {
      let res = roundExposure(num[0]);
      expect(res).toEqual(num[1]);
    });
  });

  it("rounds numbers > .008 and <= .08 to nearest hundreth", () => {
    let nums = [
      [0.0081, 0.01],
      [0.0099, 0.01],
      [0.011, 0.01],
      [0.015, 0.02],
      [0.055, 0.06],
      [0.08, 0.08],
    ];

    nums.forEach((num) => {
      let res = roundExposure(num[0]);
      expect(res).toEqual(num[1]);
    });
  });

  it("rounds numbers < .008 to nearest thosanths", () => {
    let nums = [
      [0.008, 0.008],
      [0.0051, 0.005],
      [0.0055, 0.006],
      [0.0019, 0.002],
      [0.0011, 0.001],
    ];

    nums.forEach((num) => {
      let res = roundExposure(num[0]);
      expect(res).toEqual(num[1]);
    });
  });

  it("rounds numbers < .0008 to nearest ten thosanths", () => {
    let nums = [
      [0.0008, 0.0008],
      [0.00055, 0.0006],
      [0.00051, 0.0005],
      [0.00005, 0.0001],
      [0.00004, 0],
    ];

    nums.forEach((num) => {
      let res = roundExposure(num[0]);
      expect(res).toEqual(num[1]);
    });
  });
});
