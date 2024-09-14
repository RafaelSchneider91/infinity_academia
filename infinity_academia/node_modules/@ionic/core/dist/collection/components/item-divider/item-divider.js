/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot start - Content is placed to the left of the divider text in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the divider text in LTR, and to the left in RTL.
 */
export class ItemDivider {
    constructor() {
        this.color = undefined;
        this.sticky = false;
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '60fda1dab7dbc0038ec7ff68a661896430f7d5c5', class: createColorClasses(this.color, {
                [mode]: true,
                'item-divider-sticky': this.sticky,
                item: true,
            }) }, h("slot", { key: '6ce072dfc2adfa699a2c34ffe25ed221c74d9eea', name: "start" }), h("div", { key: '9a441be204ee2f0b567432722407c75e3cbbe942', class: "item-divider-inner" }, h("div", { key: 'fd6f2969b345dba51400a290473e594d2d019dc5', class: "item-divider-wrapper" }, h("slot", { key: 'ebf5601b21c4cf199c01bf142865b8da0c1ba4a6' })), h("slot", { key: '249af8f30113f2c986976d518126661f65531121', name: "end" }))));
    }
    static get is() { return "ion-item-divider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["item-divider.ios.scss"],
            "md": ["item-divider.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["item-divider.ios.css"],
            "md": ["item-divider.md.css"]
        };
    }
    static get properties() {
        return {
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Color",
                    "resolved": "\"danger\" | \"dark\" | \"light\" | \"medium\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\" | string & Record<never, never> | undefined",
                    "references": {
                        "Color": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::Color"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
                },
                "attribute": "color",
                "reflect": true
            },
            "sticky": {
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
                    "text": "When it's set to `true`, the item-divider will stay visible when it reaches the top\nof the viewport until the next `ion-item-divider` replaces it.\n\nThis feature relies in `position:sticky`:\nhttps://caniuse.com/#feat=css-sticky"
                },
                "attribute": "sticky",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
