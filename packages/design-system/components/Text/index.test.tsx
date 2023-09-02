import { Text } from "./index";
import { render } from "@alura/test-commons/react-testing-library";

describe("<Text />", () => {
    it("renders h1 tag", () => {
        const { container } = render(<Text tag="h1">Sample Text</Text>, null);
        expect(container).toMatchSnapshot();
    });
});
