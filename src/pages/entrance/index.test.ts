import { Entrance } from "./index";
import { expect } from "chai";
import Block from "../../utils/Component";

describe('Entrance Page', () => {
    it('should render', () => {
        new Entrance();
    });

    it('element should return div tag', () => {
        const page = new Entrance();
        const element = page.element;
        expect(element).to.be.instanceof(window.HTMLDivElement)
    });

    it('should have fields and buttons', () => {
        const page = new Entrance();
        expect(page.children.entranceButton).to.be.instanceof(Block);
    });
});
