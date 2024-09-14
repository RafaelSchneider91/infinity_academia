/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Grid {
    constructor() {
        this.fixed = false;
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '930ce78b02f8360fbca08a35d364d2c09128c6c8', class: {
                [mode]: true,
                'grid-fixed': this.fixed,
            } }, h("slot", { key: 'c47bf7ef2197f5ebc42d3e2c55044276fb0db393' })));
    }
    static get is() { return "ion-grid"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["grid.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["grid.css"]
        };
    }
    static get properties() {
        return {
            "fixed": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the grid will have a fixed width based on the screen size."
                },
                "attribute": "fixed",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
}
