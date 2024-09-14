/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class CardTitle {
    constructor() {
        this.color = undefined;
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: 'f904a0ca6489f147d03c9c5f9f2c5549cdb38d1a', role: "heading", "aria-level": "2", class: createColorClasses(this.color, {
                'ion-inherit-color': true,
                [mode]: true,
            }) }, h("slot", { key: 'effb921de4ad8dfbbe318b3f692f4005812da7b1' })));
    }
    static get is() { return "ion-card-title"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["card-title.ios.scss"],
            "md": ["card-title.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["card-title.ios.css"],
            "md": ["card-title.md.css"]
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
            }
        };
    }
}
