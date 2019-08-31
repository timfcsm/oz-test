import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";

import styles from './VCheckbox.scss?module';

interface Props {
    checked: boolean;
}

@Component
export default class VCheckbox extends VueComponent<Props>{
    @Prop()
    private checked!: boolean;

    render(): VNode {
        return <input class={styles.VCheckbox} type="checkbox" checked={this.checked}/>
    }
}
