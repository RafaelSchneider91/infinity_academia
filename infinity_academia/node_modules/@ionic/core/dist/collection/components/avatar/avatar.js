/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Avatar {
    render() {
        return (h(Host, { key: 'dc1e3cd535e419eebe5599574fd2393ebfde8bbc', class: getIonMode(this) }, h("slot", { key: 'edb8441c063ea592b41345ea97d88ecd90cb3052' })));
    }
    static get is() { return "ion-avatar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["avatar.ios.scss"],
            "md": ["avatar.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["avatar.ios.css"],
            "md": ["avatar.md.css"]
        };
    }
}
