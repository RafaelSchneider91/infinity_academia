/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Row {
    render() {
        return (h(Host, { key: '813c9a7f6782d2cf8eb27f30d3ab28e6f3122868', class: getIonMode(this) }, h("slot", { key: '356bec4d4d408ea63d6b431b06465d5b7bcbff71' })));
    }
    static get is() { return "ion-row"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["row.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["row.css"]
        };
    }
}
