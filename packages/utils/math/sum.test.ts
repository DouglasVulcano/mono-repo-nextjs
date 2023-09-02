import { calculateSum } from "./sum";

describe("calculateSum()", () => {
    it("when receives 1 and 2, returns 3", () => {
        expect(calculateSum(1, 2)).toBe(3);
    });

    it("when receives -1 and 1, returns 0", () => {
        expect(calculateSum(-1, 1)).toBe(0);
    });

    it("when receives 0 and 0, returns 0", () => {
        expect(calculateSum(0, 0)).toBe(0);
    });

    it("when receives 1000 and 500, returns 1500", () => {
        expect(calculateSum(1000, 500)).toBe(1500);
    });

    it("when receives -5 and -10, returns -15", () => {
        expect(calculateSum(-5, -10)).toBe(-15);
    });
});
