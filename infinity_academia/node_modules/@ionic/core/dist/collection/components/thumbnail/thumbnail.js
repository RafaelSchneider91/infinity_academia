/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Thumbnail {
    render() {
        return (h(Host, { key: 'ea55000055f941b0c79561e8934be6242ec8e114', class: getIonMode(this) }, h("slot", { key: 'a4f934f442797f5c66a77e0ef8920fdd07c204f2' })));
    }
    static get is() { return "ion-thumbnail"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["thumbnail.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["thumbnail.css"]
        };
    }
}
