import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './VCheckbox.scss?module';

interface IProps {
    checked: boolean;
}

@Component
export default class VCheckbox extends VueComponent<IProps> {
    @Prop()
    private checked!: boolean;

    render(): VNode {
        return <input class={styles.VCheckbox} type="checkbox" checked={this.checked}/>;
    }
}
