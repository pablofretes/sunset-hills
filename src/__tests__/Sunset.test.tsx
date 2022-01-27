import { render, screen } from "@testing-library/react";
import Sunset from "../sunset/Sunset";

describe('Sunset', () => {
    it('should render', () => {
        render(<Sunset/>);
        expect(screen.getByText("Buildings: 3")).toBeDefined();
        expect(screen.getByTestId("submit-form")).toBeDefined();
        expect(screen.getByTestId("scroll-input")).toBeDefined();
        expect(screen.getByTestId("scroll-submit")).toBeDefined();
        expect(screen.getByTestId("sun")).toBeDefined();
    });
});